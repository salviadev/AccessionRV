/* tslint:disable */

import * as path from 'path';
import { IObjectStore, IDataDriverOptions } from '@phoenix/boc-interfaces';
import { SpoObjectStore, ISqlObjectStoreHandlers } from '@phoenix/sql-data-driver';
import { DataDriverNames } from './interfaces';
const stores: { [key: string]: IObjectStore } = {};
export const sqlStoreFactory = (dataDriverName: string, sessionOptions: IDataDriverOptions, sqlHandlers: ISqlObjectStoreHandlers): IObjectStore => {
    if (stores[dataDriverName]) {
        return stores[dataDriverName];
    }
    sessionOptions = sessionOptions || {};
    const paths = [path.join(__dirname, 'schemas/' + dataDriverName + '_model.js')];
    if (dataDriverName === DataDriverNames.SpoDirect) {
        paths.push(path.join(__dirname, 'schemas/Accession_model.js'));
    }
    sessionOptions.pathToModel = paths.join(';');
    stores[dataDriverName] = new SpoObjectStore(sessionOptions, sqlHandlers);
    return stores[dataDriverName];
};