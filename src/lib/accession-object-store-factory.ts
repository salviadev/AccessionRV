import * as path from 'path';
import * as boc from '@phoenix/boc';
import { IObjectStore, IDataDriverOptions, StoreCommandLanguage } from '@phoenix/boc-interfaces';
import { AccessionSession } from './accession-session';
import { sqlStoreFactory } from './sql-object-store-factory';
import * as _ from 'lodash';
import { ISqlObjectStoreHandlers, SqlVersionHandler } from '@phoenix/sql-data-driver';
import { DataDriverName, DataDriverNames } from './interfaces';
import { Utils } from './tools/utils';

export interface IAccessionObjectStoreFactorySettings {
    dataDriverOptions: IDataDriverOptions;
}
export class AccessionObjectStoreFactory implements boc.IObjectStoreFactory {
    public readonly settings: IAccessionObjectStoreFactorySettings;
    constructor(settings: IAccessionObjectStoreFactorySettings) {
        this.settings = settings;
    }
    public async createObjectStore(session: boc.Session, dataDriverName: DataDriverName): Promise<IObjectStore> {
        const config = Utils.getConfig();
        const sessionOptions: IDataDriverOptions = _.cloneDeep(this.settings.dataDriverOptions);
        const sessionLogger = session.logger;
        sessionOptions.logger = sessionLogger;
        const accessionSession: AccessionSession = session instanceof AccessionSession ? session : undefined;
        let sqlHandlers: ISqlObjectStoreHandlers;
        if (accessionSession) {
            if (accessionSession.tenant
                && config.tenants
                && config.tenants[accessionSession.tenant]) {
                const tenantOptions = config.tenants[accessionSession.tenant];
                if (tenantOptions && tenantOptions[dataDriverName]) {
                    const options = tenantOptions[dataDriverName];
                    _.merge(sessionOptions, options);
                }
            }
            if (dataDriverName === DataDriverNames.SpoDirect) {
                sqlHandlers = {
                    versionHandler: new SqlVersionHandler("SELECT versioncp FROM INCOMPOS WHERE idcompos='M82"),
                };
            }
        }

        const objectStore = (sessionOptions && sessionOptions.dataProtocol === 'sql') ?
            sqlStoreFactory(dataDriverName, sessionOptions, sqlHandlers) : null;
        objectStore.storeName = dataDriverName;
        if (!objectStore.commandLanguage) {
            objectStore.commandLanguage = sessionOptions.language || StoreCommandLanguage.MSSQL;
        }
        return objectStore;
    }
}
