import * as boc from '@phoenix/boc';
import { Utils } from './utils';
import { DataDriverNames } from '../interfaces';
import { StoreCommandLanguage } from '@phoenix/boc-interfaces';
import { model as spoModel } from '../schemas/SpoDirect_model';
import { model as accessionModel } from '../schemas/Accession_model';

export class Spo {
    public static getTableName(constr: boc.ModelObjectConstructor<boc.ModelObject>): string {
        const name = constr.name;
        const sm: any = spoModel;
        const am: any = accessionModel;
        const modelSchema = sm[name] || am[name];
        return modelSchema ? (modelSchema.tableName ? modelSchema.tableName : modelSchema.name) : null;
    }
    public static async getNewId(
        container: boc.Container, tableName: string | boc.ModelObjectConstructor<boc.ModelObject>, key: string, prefix: string, increment?: number, iIddom?: string): Promise<string> {

        if (typeof (tableName) !== 'string') {
            tableName = this.getTableName(tableName);
        }
        iIddom = iIddom || '*';
        const os = await container.getObjectStoreByName(DataDriverNames.SpoDirect);
        const id = await os.processAction('counter', { table: tableName, key, iIddom });
        if (id > 1E8) {
            return prefix + Utils.formatId(id, 16);
        } else {
            return prefix + Utils.formatId(id, 8);
        }
    }
    public static async getNewIds(container: boc.Container, tableName: string | boc.ModelObjectConstructor<boc.ModelObject>, key: string, increment: number, iIddom?: string): Promise<number[]> {
        iIddom = iIddom || '*';
        const os = await container.getObjectStoreByName(DataDriverNames.SpoDirect);
        if (typeof (tableName) !== 'string') {
            tableName = this.getTableName(tableName);
        }
        const id = await os.processAction('counter', { table: tableName, key, increment, iIddom });
        const startid = id - increment + 1;
        const res: number[] = [];
        for (let i = startid; i <= id; i++) {
            res.push(i);
        }
        return res;
    }
    public static async getFormatedNewIds(
        container: boc.Container, tableName: string | boc.ModelObjectConstructor<boc.ModelObject>, key: string, increment: number, length?: number, prefix?: string): Promise<string[]> {

        prefix = prefix || '';
        const numIds = await this.getNewIds(container, tableName, key, increment);
        return numIds.map(i => {
            length = length || (i > 1E8 ? 16 : 8);
            return prefix + Utils.formatId(i, length);
        });
    }

    public static async execSql(container: boc.Container, sql: string): Promise<any> {
        const os = await container.getObjectStoreByName(DataDriverNames.SpoDirect);
        return os.processAction('sql', sql);
    }
    public static async databaseStructure(container: boc.Container): Promise<any> {
        const os = await container.getObjectStoreByName(DataDriverNames.SpoDirect);
        return os.processAction('structure_db');
    }
    public static async databaseCreate(container: boc.Container): Promise<any> {
        const os = await container.getObjectStoreByName(DataDriverNames.SpoDirect);
        return os.processAction('structure_create');
    }
    public static async databaseUpdate(container: boc.Container): Promise<any> {
        const os = await container.getObjectStoreByName(DataDriverNames.SpoDirect);
        return os.processAction('structure_update');
    }
    public static async getCommandLanguage(container: boc.Container): Promise<StoreCommandLanguage> {
        const store = await container.sessionServices.getObjectStore(DataDriverNames.SpoDirect);
        return store.commandLanguage;
    }
}