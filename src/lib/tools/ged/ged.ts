import * as boc from '@phoenix/boc';
export interface IProperties extends IStandardProperties, ISubTypeSpoProperties { }

export interface IStandardProperties {
    objectId?: string;
    description?: string;
    creationDate?: string; // date-time
    lastModificationDate?: string; // date-time
    contentStreamMimeType?: string; // type mime http
    contentStreamLength?: string;
    contentStreamFileName?: string;
}

export interface ISubTypeSpoProperties extends ISubTypeProperties {
    libelle?: string;
    modele?: boolean;
    defaultModel?: boolean;
    objet?: string;
    refOperation?: string;
    refTrancheTr?: string;
    refTrancheComm?: string;
    refDossierClient?: string;
    refDossierTma?: string;
    refLot?: string | string[];
    refPiece?: string | string[];
    refProcedure?: string;
    refFinancement?: string | string[];
    sourceModel?: string;
    expediteur?: string;
    destinataire?: string;
    signataires?: string;
}

export interface ISubTypeProperties {
    [key: string]: any;
}

export interface ISubTypeMeta {
    name: SubTypeList;
    prefix: string;
    properties: ISubTypeProperties;
}

export interface ISubTypeSpoMeta extends ISubTypeMeta {
    name: SubTypeList.SpoDocMeta;
    prefix: 'spo';
    properties: ISubTypeSpoProperties;
}

export enum SubTypeList {
    SpoDocMeta = 'SpoDocMeta'
}

export enum PrefixProperties {
    CMIS = 'cmis',
    SPO = 'spo'
}

export enum UrlType {
    UPLOAD_PROXY = 1,
    DOWNLOAD = 2,
    DOWNLOAD_PROXY = 3
}

export interface IGed {
    createDocument(data: IProperties, contentPath?: string): Promise<IProperties>;
    updateMeta(objectId: string, data: IProperties): Promise<IProperties>;
    getMeta(objectId: string): Promise<IProperties>;
    getMetas(select: string[], filter: IProperties, search?: IProperties): Promise<IProperties[]>;

    uploadContent(objectId: string, contentPath: string, filename?: string): Promise<void>;
    downloadContent(objectId: string, outputPath: string): Promise<void>;
    removeDocument(objectId: string): Promise<void>;

    getUrl(container: boc.Container, type: UrlType, objectId?: string, inline?: boolean):
        Promise<{ url: { hostname: string, path: string, url: string, connexion: any }, ignoreCertificateErrors?: boolean }>;
}