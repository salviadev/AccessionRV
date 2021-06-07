import * as boc from '@phoenix/boc';
import { IGed, IProperties, PrefixProperties, UrlType } from './ged';
import { cmis } from '../cmis';
import * as fs from 'fs';
import * as path from 'path';
import { Utils } from '../utils';
import * as nodeFetch from '../fetch';
import { IServiceOptions } from '../../interfaces';
const x = require('cmis');

export class Ged implements IGed {
    private config: IServiceOptions;
    private username: string;
    private password: string;
    private token: string;
    private inited: boolean;
    private folderId: string;
    private session: cmis.CmisSession;

    private allProps = {
        [PrefixProperties.CMIS]: ['objectId', 'name', 'description', 'creationDate', 'lastModificationDate',
            'contentStreamMimeType', 'contentStreamLength', 'contentStreamFileName'
        ],
        [PrefixProperties.SPO]: [
            'libelle', 'modele', 'objet', 'refOperation', 'refTrancheTr', 'refTrancheComm',
            'refDossierClient', 'refDossierTma', 'refLot', 'refPiece', 'refProcedure',
            'defaultModel', 'sourceModel', 'refFinancement', 'expediteur', 'destinataire', 'signataires'
        ]
    };

    constructor(config: IServiceOptions) {
        this.config = config;
    }

    public async createDocument(data: IProperties, contentPath?: string): Promise<IProperties> {
        await this.init();
        const metaInfo: any = {
            'cmis:secondaryObjectTypeIds': ['P:spo:SpoDocMeta']
        };
        delete data.objectId;
        data.name = data.libelle + ' - ' + Utils.uuid22();
        for (const prop of Object.keys(data)) {
            const value = prop === 'modele' || prop === 'defaultModel' ? '' + data[prop] : data[prop];
            if (value !== undefined) {
                const prefix = this.allProps[PrefixProperties.CMIS].indexOf(prop) !== -1 ? PrefixProperties.CMIS : PrefixProperties.SPO;
                metaInfo[prefix + ':' + prop] = value;
            }
        }
        let contentStream = null;
        if (contentPath) {
            contentPath = path.join(Utils.tmpFolder, contentPath);
            contentStream = fs.readFileSync(contentPath);
        }
        const result = await this.session.createDocument(this.folderId, contentStream, metaInfo);
        return this.parseData(result.succinctProperties);
    }
    public async updateMeta(objectId: string, data: IProperties): Promise<IProperties> {
        await this.init();
        const metaInfo: any = {};
        for (const prop of Object.keys(data)) {
            const value = prop === 'modele' || prop === 'defaultModel' ? '' + data[prop] : data[prop];
            if (value !== undefined) {
                const prefix = this.allProps[PrefixProperties.CMIS].indexOf(prop) !== -1 ? PrefixProperties.CMIS : PrefixProperties.SPO;
                metaInfo[prefix + ':' + prop] = value;
            }
        }
        await this.session.updateProperties(objectId, metaInfo);
        return this.getMeta(objectId);
    }
    public async getMeta(objectId: string): Promise<IProperties> {
        await this.init();
        const selection = [];
        selection.push(...this.allProps[PrefixProperties.CMIS].map(prop => PrefixProperties.CMIS + ':' + prop));
        selection.push(...this.allProps[PrefixProperties.SPO].map(prop => PrefixProperties.SPO + ':' + prop));
        return this.parseData(await this.session.getProperties(objectId, 'latest', { filter: selection.join(',') }));
    }
    public async getMetas(select: string[], filter: IProperties, search?: IProperties): Promise<IProperties[]> {
        await this.init();
        let selection: string[];
        if (select) {
            selection = select.map(prop => {
                const prefix = this.allProps.cmis.indexOf(prop) !== -1 ? PrefixProperties.CMIS : PrefixProperties.SPO;
                return `${prefix}:${prop}`;
            });
        } else {
            selection = [];
            selection.push(...this.allProps[PrefixProperties.CMIS].map(prop => PrefixProperties.CMIS + ':' + prop));
            selection.push(...this.allProps[PrefixProperties.SPO].map(prop => PrefixProperties.SPO + ':' + prop));
        }
        const filterList = [];
        for (const prop of Object.keys(filter || {})) {
            const value = prop === 'modele' || prop === 'defaultModel' ? (filter[prop] ? 'TRUE' : 'FALSE') : `'${filter[prop]}'`;
            const prefix = this.allProps[PrefixProperties.CMIS].indexOf(prop) !== -1 ? PrefixProperties.CMIS : PrefixProperties.SPO;
            if (Array.isArray(value)) {
                const svalue = value.join(', ');
                filterList.push(`${prefix}:${prop} in (${svalue})`);
            } else {
                filterList.push(`${prefix}:${prop}=${value}`);
            }
        }
        const searchList = [];
        for (const prop of Object.keys(search || {})) {
            const prefix = this.allProps[PrefixProperties.CMIS].indexOf(prop) !== -1 ? PrefixProperties.CMIS : PrefixProperties.SPO;
            searchList.push(`${prefix}:${prop} LIKE '%${search[prop]}%'`);
        }
        let where = filterList.length ? 'where ' + filterList.join(' and ') : '';
        where += searchList.length ? (where ? ' and ' : 'where ') + '(' + searchList.join(' or ') + ')' : '';
        const response = await this.session.query(`select cmis:objectId from spo:SpoDocMeta ${where}`, false, { succinct: true });
        const allMetas = [];
        for (const item of response.results) {
            allMetas.push(this.parseData(await this.session.getProperties(item.succinctProperties['cmis:objectId'], 'latest', { filter: selection.join(',') })));
        }
        return allMetas;
    }

    public async uploadContent(objectId: string, contentPath: string, filename?: string): Promise<void> {
        await this.init();
        let contentStream = null;
        if (contentPath) {
            contentPath = path.join(Utils.tmpFolder, contentPath);
            contentStream = fs.readFileSync(contentPath);
            await this.session.setContentStream(objectId, contentStream, true, filename);
        }
    }
    public async downloadContent(objectId: string, outputPath: string): Promise<void> {
        return new Promise<void>(async (resolve: any, reject: any) => {
            await this.init();
            const contentUrl = await this.session.getContentStreamURL(objectId);
            let auth: string;

            if (this.username && this.password) {
                auth = 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64');
            } else if (this.token) {
                auth = `Bearer ${this.token}`;
            }

            const cfg: any = { headers: {} };
            if (auth) {
                cfg.headers.Authorization = auth;
            } else {
                cfg.credentials = 'include';
            }
            const contentStream = await nodeFetch.fetch(contentUrl, cfg);
            try {
                fs.unlinkSync(outputPath);
            } catch (err) {
                console.log('');
            }
            const w = fs.createWriteStream(outputPath);
            w.on('close', () => {
                resolve();
            });
            w.on('error', (err) => {
                reject(err);
            });
            contentStream.body.pipe(w);
        });
    }
    public async removeDocument(objectId: string): Promise<void> {
        await this.init();
        await this.session.deleteObject(objectId);
    }

    public async getUrl(container: boc.Container, type: UrlType, objectId?: string, inline?: boolean):
        Promise<{ url: { hostname: string, path: string, url: string, connexion: any }, ignoreCertificateErrors?: boolean }> {
        switch (type) {
            case UrlType.DOWNLOAD:
                const contentStreamUrl = await this.session.getContentStreamURL(objectId, inline ? 'inline' : 'attachment');
                return {
                    url: {
                        hostname: null,
                        path: null,
                        url: contentStreamUrl,
                        connexion: {
                            token: this.token,
                            username: this.username,
                            password: this.password
                        }
                    },
                    ignoreCertificateErrors: this.config.ignoreCertificateErrors
                };
            case UrlType.DOWNLOAD_PROXY:
                return {
                    url: {
                        path: `/api/ged/${objectId}`,
                        hostname: null,
                        url: null,
                        connexion: null
                    }
                };
            case UrlType.UPLOAD_PROXY:
                return {
                    url: {
                        hostname: null,
                        path: `/api/upload/tmp`,
                        url: null,
                        connexion: null
                    }
                };
        }
    }

    private async init(): Promise<void> {
        if (this.inited) {
            return;
        }
        const config = this.config;
        this.session = new x.CmisSession(config.url);
        if (config.extraHeaders && config.extraHeaders.authentication) {
            const [username, password] = config.extraHeaders.authentication.split(':');
            if (password) {
                this.session.setCredentials(username, password);
                this.username = username;
                this.password = password;
            } else if (username) {
                this.session.setToken(username);
                this.token = username;
            }
        }
        this.session.setCharset('UTF-8');
        await this.session.loadRepositories();
        const rootInfo = await this.session.getObjectByPath('/');
        const rootId = rootInfo.succinctProperties['cmis:objectId'];
        let folderFound = true;
        try {
            const oi = await this.session.getObjectByPath('/SPO');
            this.folderId = oi.succinctProperties['cmis:objectId'];
        } catch (e) {
            if (e && e.response.status === 404) {
                folderFound = false;
            } else {
                throw e;
            }
        }
        if (!folderFound) {
            const fi = await this.session.createFolder(rootId, 'SPO');
            this.folderId = fi.succinctProperties['cmis:objectId'];
        }
        this.inited = true;
    }

    private parseData(data: any): IProperties {
        const result: IProperties = {};
        for (const prop of this.allProps[PrefixProperties.CMIS]) {
            let value = data[PrefixProperties.CMIS + ':' + prop];
            if (value && (prop === 'creationDate' || prop === 'lastModificationDate')) {
                value = (new Date(value)).toISOString();
            }
            result[prop] = value;
        }
        for (const prop of this.allProps[PrefixProperties.SPO]) {
            result[prop] = data[PrefixProperties.SPO + ':' + prop];
        }
        return result;
    }
}