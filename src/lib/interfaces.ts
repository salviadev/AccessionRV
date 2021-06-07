import { IDataDriverOptions } from '@phoenix/boc-interfaces';
import {
    IErrorHandlerOptions, ISessionManagerOptions, IRequestLoggerSettings, ISessionManagerSettings
} from '@phoenix/server-commons';
import { LogLevel } from '@phoenix/logger';

export type DataDriverName = 'SpoDirect';
export class DataDriverNames {
    // tslint:disable-next-line:variable-name
    public static readonly SpoDirect = 'SpoDirect';
    public static readonly all: DataDriverName[] = [
        DataDriverNames.SpoDirect
    ];
}

export interface IDataDriverConfigs {
    SpoDirect?: IDataDriverOptions;
}
export interface IDataDriverOverridesByTenant {
    [tenant: string]: IDataDriverConfigs;
}
export interface IConfigOverride extends IDataDriverConfigs, IConnexionInfo {
}
export interface IConfigOverridesByTenant {
    [tenant: string]: IConfigOverride;
}
export interface ILog {
    stackTrace?: boolean;
    requestProperties?: string[];
    level?: LogLevel | 'none';
    logDirectory?: string;
    logFileName?: string;
}

export interface IOptimisation {
    noWiredRules?: boolean;
}
export interface IVersion {
    checkVersion?: boolean;
    entityName?: string;
}
export interface IServiceTiersInfo {
    host?: string;
    tenant?: string;
    developpement?: boolean;
    authorization?: string;
}

export interface IServiceOptions {
    url?: string;
    extraHeaders?: {
        [headerName: string]: string;
    };
    ignoreCertificateErrors?: boolean;
}

export interface IConnexionInfo {
    userId?: string;
    profId?: string;
    password?: string;
    spoUrl?: string;
    serverTiers?: IServiceTiersInfo;
}

export interface IApiConfig {
    doNotSetCookieOnLogin?: boolean;
}

export interface IAccessionRVConfig {
    defaultDataDriver?: IDataDriverConfigs;
    tenants?: IConfigOverridesByTenant;
    CMIS?: IServiceOptions;
    DocMerge?: IServiceOptions;
    session?: ISessionManagerOptions;
    log?: ILog;
    version?: IVersion;
    useGED?: boolean;
    gedStoragePath?: string;
    useCMIS?: boolean;
    useDocMerge?: boolean;
    useGIS?: boolean;
    simuSPO?: boolean;
    searchTasksInterval?: number;
    optimisation?: IOptimisation;
    resourcesFolder?: string;
    osmServerUrl?: string;
    useRights?: boolean;
    userId?: string;
    profId?: string;
    serverTiers?: IServiceTiersInfo;
    serverPlanning?: IServiceTiersInfo;
    doNotAuthenticate?: boolean;
    spoUrl?: string;
    pathAccessionUX?: string;
    pathChrome?: string;
    baseUrl: string;
    ignoreCertificateErrors?: boolean;
    serverTimeout?: number;
    jwtSecret?: string;
    defaultCulture?: string;
    apiConfig?: IApiConfig;
    useInseeData?: boolean;
    inseeToken?: string;
}

// A supprimer
export interface IAccessionRVSettings {
    defaultDataDriverSettings: IDataDriverConfigs;
    tenants: IConfigOverridesByTenant;
    CMIS?: IServiceOptions;
    DocMerge?: IServiceOptions;
    errorHandlerSettings: IErrorHandlerOptions;
    sessionSettings: ISessionManagerSettings;
    requestLoggerSettings: IRequestLoggerSettings;
    version: IVersion;
    useGED: boolean;
    gedStoragePath?: string;
    useCMIS: boolean;
    useDocMerge: boolean;
    useGIS: boolean;
    simuSPO: boolean;
    baseUrl: string;
    searchTasksInterval?: number;
    optimisation?: IOptimisation;
    resourcesFolder?: string;
    osmServerUrl?: string;
    useRights?: boolean;
    userId?: string;
    profId?: string;
    doNotAuthenticate?: boolean;
    spoUrl?: string;
    pathAccessionUX?: string;
    pathChrome?: string;
    ignoreCertificateErrors: boolean;
    serverTimeout?: number;
    jwtSecret: string;
    defaultCulture: string;
    apiConfig?: IApiConfig;
    useInseeData?: boolean;
    inseeToken?: string;
}
