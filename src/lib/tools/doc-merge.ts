import { IDataDriverOptions } from '@phoenix/boc-interfaces';
import * as boc from '@phoenix/boc';
import { ExtError } from '@phoenix/server-commons';
import { Utils } from './utils';
/*
interface IModelUrl {
    url: string;
    connexion: { username: string, password: string, token: string};
}

export class DocMerge {
    private container: boc.Container;
    private url: string;
    private ignoreCertificateErrors: boolean;
    // private config: IDataDriverOptions;
    // private client: dmc.Client;
    // [templatesName: string]: any;

    public constructor(c: boc.Container) {
        if (!c || !(c instanceof boc.Container)) {
            throw new ExtError(500, 'Require container');
        }
        this.container = c;
    }

    public async merge(data: any, modelUrl: IModelUrl, docType?: dmc.TypeDoc): Promise<string> {
        if (!data || !modelUrl) {
            throw new ExtError(400, 'Données ou modelUrl manquant');
        }
        const headers: any = {};
        if (modelUrl.connexion) {
            let auth: string;
            if (modelUrl.connexion.username && modelUrl.connexion.password) {
                auth = 'Basic ' + Buffer.from(`${modelUrl.connexion.username}:${modelUrl.connexion.password}`).toString('base64');
            } else if (modelUrl.connexion.token) {
                auth = `Bearer ${modelUrl.connexion.token}`;
            }
            if (auth) {
                headers.Authorization = auth;
            }
        }
        const client = await this.getClient();
        const url: string = await client.getUrl(docType || dmc.TypeDoc.WORD, data, {
            url: modelUrl.url,
            headers
        });
        const uri = url.split('/');
        const key = uri[uri.length - 1];
        return key;
    }

    public async merge2(data: any, modelUrl: IModelUrl, outputPath: string, docType?: dmc.TypeDoc) {
        if (!data || !modelUrl) {
            throw new ExtError(400, 'Données ou modelUrl manquant');
        }
        const headers: any = {};
        if (modelUrl.connexion) {
            let auth: string;
            if (modelUrl.connexion.username && modelUrl.connexion.password) {
                auth = 'Basic ' + Buffer.from(`${modelUrl.connexion.username}:${modelUrl.connexion.password}`).toString('base64');
            } else if (modelUrl.connexion.token) {
                auth = `Bearer ${modelUrl.connexion.token}`;
            }
            if (auth) {
                headers.Authorization = auth;
            }
        }
        const client = await this.getClient();
        return client.get(docType || dmc.TypeDoc.WORD, data, {
            url: modelUrl.url,
            headers
        }, outputPath);
    }

    public proxyDownloadUrl(key: string, filename?: string): string {
        let uri = `/api/docmerge/${key}`;
        if (filename) {
            uri += `?filename=${filename}`;
        }
        return uri;
    }

    public async downloadUrl(key: string, filename?: string): Promise<{
        url: { hostname: string, path: string },
        ignoreCertificateErrors: boolean
    }> {

        await this.initConnectionInfo();
        const dataUrl = this.url;
        return {
            url: {
                hostname: dataUrl,
                path: '/download/' + key + (filename ? '?filename=' + filename : '')
            },
            ignoreCertificateErrors: this.ignoreCertificateErrors
        };
    }

    private async initConnectionInfo(): Promise<void> {
        if (!this.url) {
            const config = Utils.getOptions().DocMerge;
            if (!config || !config.url) {
                throw new Error(this.container.t('Il manque l\'entrée "DocMerge.url". dans le fichier config'));
            }
            this.url = config.url;
            this.ignoreCertificateErrors = config.ignoreCertificateErrors;
        }
    }

    private async getClient(): Promise<dmc.Client> {
        if (!this.client) {
            await this.initConnectionInfo();
            this.client = new dmc.Client(this.url, this.ignoreCertificateErrors);
        }
        return this.client;
    }
}
*/