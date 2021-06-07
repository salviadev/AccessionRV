import * as path from 'path';
import * as fs from 'fs';
import { SpoObjectStore } from '@phoenix/sql-data-driver';
import { IDataDriverOptions } from '@phoenix/boc-interfaces';
export enum LogLevel {
    NONE = 0,
    INFO = 1,
    VERBOSE = 2,
}
export type LoggerFunc = (level: LogLevel, message: string) => void;

export interface IDatabaseUpdateOptions {
    connectionString: string;
    tenant: string;
    test: boolean;
    maxLogLevel: LogLevel;
    logger: LoggerFunc;
    schemaName?: string;
    outputDir?: string;
}

export class DatabaseUpdater {
    private _options: IDatabaseUpdateOptions;

    public constructor(options: IDatabaseUpdateOptions) {
        this._options = options;
    }
    public async db2schema(): Promise<number> {
        try {
            const connectionData = this.parseConnectionString(this._options.connectionString);
            const connectionInfo: IDataDriverOptions = {
                dataProtocol: 'sql',
                isMdr: true,
                tenantId: this._options.tenant || '1',
                options: {
                    client: 'mssql',
                    log: this._options.maxLogLevel === LogLevel.VERBOSE,
                    connection: connectionData,
                }
            };
            this.log(LogLevel.INFO, `Connecting to server: ${connectionData.server}, Database: ${connectionData.database}`);
            const schema = await SpoObjectStore.schemaOfDatabase(this._options.schemaName || 'dbo', this._options.connectionString);
            if (this._options.outputDir) {
                const outputFile = path.join(this._options.outputDir, 'schema.json');
                this.log(LogLevel.INFO, `Writing schema to: ${outputFile}`);
                await fs.promises.writeFile(outputFile, schema);
            }
            return 0;
        } catch (e) {
            this.error(e.message || e);
            return -1;
        }
    }

    public async updateDatabase(): Promise<number> {
        try {
            const connectionData = this.parseConnectionString(this._options.connectionString);
            const connectionInfo: IDataDriverOptions = {
                dataProtocol: 'sql',
                isMdr: true,
                tenantId: this._options.tenant || '1',
                options: {
                    client: 'mssql',
                    log: this._options.maxLogLevel === LogLevel.VERBOSE,
                    connection: connectionData,
                }
            };
            this.log(LogLevel.INFO, `Connecting to server: ${connectionData.server}, Database: ${connectionData.database}`);
            const paths = [
                path.join(__dirname, '../schemas/Accession_model.js'),

            ];
            connectionInfo.pathToModel = paths.join(';');
            const store = new SpoObjectStore(connectionInfo, null);
            try {
                this.log(LogLevel.INFO, 'Load current database structure.');
                const structureDB = await store.schema('dbo');
                this.log(LogLevel.INFO, 'Load current model structure.');
                const structureModel = await store.model2Schema('dbo', null, (entity) => {
                    return entity.$mdr;
                });
                this.log(LogLevel.INFO, 'Generate delta.');
                const structure = structureDB.deltaSQL(structureModel);
                const sql = structure.join('\nGO\n');
                if (this._options.test) {
                    await store.execSql('select 1');
                    this.log(LogLevel.VERBOSE, sql);
                    this.log(LogLevel.INFO, 'OK.');
                    return 0;
                }
                this.log(LogLevel.INFO, 'Execute upgrade script.');
                this.log(LogLevel.VERBOSE, sql);
                await store.execSqlStructure(sql);
            } finally {
                await store.destroy();
            }
            this.log(LogLevel.INFO, 'OK.');
            return 0;
        } catch (e) {
            this.error(e.message || e);
            return -1;
        }
    }
    private log(level: LogLevel, message: string) {
        this._options.logger(level, message);
    }
    private error(message: string) {
        console.error(message);
    }
    private parseConnectionString(value: string): {
        user: string;
        password: string;
        server: string;
        database: string;
    } {
        if (!value)
            throw new Error('Connection string is empty');
        const params: any = {};
        // Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword;
        value.split(';').forEach(ii => {
            if (ii) {
                const p = ii.split('=');
                if (p.length === 2) {
                    params[p[0].trim()] = p[1].trim();
                }
            }
        });
        if (!params.Server || !params.Database || !params.Uid || !params.Pwd) {
            throw new Error('Invalid Connection string, Server or Database or Uid or PWD is missing');
        }
        return {
            user: params.Uid,
            password: params.Pwd || null,
            server: params.Server,
            database: params.Database,
        };
    }
}
export function getLogger(maxLogLevel: LogLevel): LoggerFunc {
    return (level, message) => {
        if (level <= maxLogLevel) {
            console.log(message);
        }
    };
}
