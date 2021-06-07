import * as boc from '@phoenix/boc';
import { Utils } from '../utils';
import { IGed, IProperties, UrlType } from './ged';
import { GedMiniHelper } from './ged-integrated-tools';
import * as path from 'path';
import * as fs from 'fs';
import * as mime from 'mime';
import { IDocument } from './ged-interfaces';
import { AccessionSession } from '../../accession-session';

interface IMappings {
    objectId: string;
    libelle: string;
    description: string;
    creationDate: string;
    lastModificationDate: string;
    contentStreamMimeType: string;
    contentStreamLength: string;
    contentStreamFileName: string;
    modele: string;
    defaultModel: string;
    objet: string;
    refOperation: string;
    refTrancheTr: string;
    refTrancheComm: string;
    refDossierClient: string;
    refDossierTma: string;
    refLot: string;
    refPiece: string;
    refProcedure: string;
    refFinancement: string;
    sourceModel: string;
    expediteur: string;
    destinataire: string;
    signataires: string;

    [key: string]: string;
}
export class MiniGedAdapter implements IGed {
    private helper: GedMiniHelper;
    private mappings: IMappings = {
        objectId: 'code',
        libelle: 'libelle',
        description: 'commentaire',
        creationDate: 'dateCreation',
        lastModificationDate: 'dateModif',
        contentStreamMimeType: 'typeDoc',
        contentStreamLength: 'tailleFichier',
        contentStreamFileName: 'fichier.nomFichier',

        modele: 'refs.ref0',
        objet: 'refs.ref1',
        refOperation: 'refs.ref2',
        refTrancheTr: 'refs.ref3',
        refTrancheComm: 'refs.ref4',
        refDossierClient: 'refs.ref5',
        refDossierTma: 'refs.ref6',
        refLot: 'refs.ref7',
        refPiece: 'refs.ref8',
        refProcedure: 'refs.ref9',
        defaultModel: 'refs.ref10',
        sourceModel: 'refs.ref11',
        refFinancement: 'refs.ref12',
        expediteur: 'refs.ref13',
        destinataire: 'refs.ref14',
        signataires: 'refs.ref15'
    };

    constructor(container: boc.Container, storagePath: string) {
        this.helper = new GedMiniHelper(container, storagePath);
    }

    public async createDocument(data: IProperties, contentPath?: string): Promise<IProperties> {
        const dataFormated: any = this.formatToGedMiniData(data);
        if (contentPath) {
            contentPath = path.join(Utils.tmpFolder, contentPath);
            dataFormated.refFichier = await this.helper.uploadFile(contentPath);
            const fileData = await this.helper.getFile(dataFormated.refFichier);
            dataFormated.typeDoc = fileData.typeFichier;
            dataFormated.tailleFichier = fileData.tailleFichier;
        }
        return this.formatToGedData(await this.helper.createDocument(dataFormated));
    }
    public async updateMeta(objectId: string, data: IProperties): Promise<IProperties> {
        const dataMiniGedFormat: any = this.formatToGedMiniData(data);
        if (dataMiniGedFormat.refs && dataMiniGedFormat.refs.length) {
            const doc: any = await this.helper.getDocument(objectId);
            dataMiniGedFormat.id = doc.id;
            doc.refs.forEach((ref: any, index: number) => {
                dataMiniGedFormat.refs[index].id = ref.id;
            });
        }
        await this.helper.updateDocument(objectId || data.objectId, dataMiniGedFormat);
        return this.getMeta(objectId);
    }
    public async getMeta(objectId: string): Promise<IProperties> {
        return this.formatToGedData(await this.helper.getDocument(objectId));
    }
    public async getMetas(select: string[], filter: IProperties, search?: IProperties): Promise<IProperties[]> {
        const outputData: IProperties[] = [];
        const s: string[] = [];
        select = select || Object.keys(this.mappings);
        const $filter: any = { $and: [] };
        for (const k of Object.keys(filter || {})) {
            if (k === 'contentStreamFileName') {
                continue;
            }
            const map = this.mappings[k];
            if (map) {
                const frags = map.split('.');
                const prop = frags.length === 1 ? frags[0] : frags[1];
                const item: any = {};
                // tslint:disable-next-line:prefer-conditional-expression
                if (prop === 'ref0') {
                    item[map] = filter[k] === true ? 'MODELE' : 'DOCUMENT';
                } else {
                    if (Array.isArray(filter[k])) {
                        item[map] = { $in: filter[k] };
                    } else
                        item[map] = k === 'defaultModel' ? '' + filter[k] : filter[k];
                }
                $filter.$and.push(item);
            }
        }
        const $or: any[] = [];
        for (const k of Object.keys(search || {})) {
            if (k === 'contentStreamFileName') {
                continue;
            }
            const map = this.mappings[k];
            if (map) {
                // const frags = map.split('.');
                // const prop = frags.length === 1 ? frags[0] : frags[1];
                const prop = map;
                const item: any = {};
                item[prop] = { $regex: search[k] };
                $or.push(item);
            }
        }
        if ($or.length) {
            $filter.$and.push($or);
        }
        let $select: string[] = null;
        if (select && select.length) {
            for (const k of select) {
                const map = this.mappings[k];
                if (map) {
                    $select = $select || [];
                    $select.push(map);
                }
            }

        }
        const queryData = await this.helper.getDocuments($select, $filter);
        for (const item of queryData) {
            outputData.push(this.formatToGedData(item));
        }
        return outputData;
    }

    public async uploadContent(objectId: string, contentPath: string, filename?: string): Promise<void> {
        const meta = await this.helper.getDocument(objectId);
        if (meta) {
            await this.helper.deleteFile(meta.refFichier);
            contentPath = path.join(Utils.tmpFolder, contentPath);
            const refFichier = await this.helper.uploadFile(contentPath);
            const fileData = await this.helper.getFile(refFichier);
            const fileMeta: any = {
                typeDoc: fileData.typeFichier,
                tailleFichier: fileData.tailleFichier,
                refFichier
            };
            await this.helper.updateDocument(objectId, fileMeta);
        }
    }
    public async downloadContent(objectId: string, outputPath: string): Promise<void> {
        return new Promise<void>(async (resolve: any, reject: any) => {
            const meta = await this.helper.getDocument(objectId);
            if (meta) {
                try {
                    const response = await this.helper.downloadFile(meta.refFichier);
                    const w = fs.createWriteStream(outputPath);
                    w.on('close', () => {
                        resolve();
                    });
                    w.on('error', (err) => {
                        reject(err);
                    });
                    response.pipe(w);
                } catch (e) {
                    reject(e);
                }
            }
        });
    }
    public async removeDocument(objectId: string): Promise<void> {
        await this.helper.deleteDocument(objectId);
    }

    public async getUrl(container: boc.Container, type: UrlType, objectId?: string, inline?: boolean):
        Promise<{ url: { hostname: string, path: string, url: string, connexion: any }, ignoreCertificateErrors?: boolean }> {
        switch (type) {
            case UrlType.DOWNLOAD:
                const meta1 = await this.helper.getDocument(objectId);
                const config = Utils.getConfig();
                const session = container.sessionServices as AccessionSession;
                return {
                    url: {
                        hostname: null,
                        path: null,
                        url: `${config.baseUrl}/AccessionRV/api/ged/${objectId}`,
                        connexion: { token: session.info.jwt }
                    },
                    ignoreCertificateErrors: config.ignoreCertificateErrors
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
        return null;
    }
    private formatToGedMiniData(inputData: IProperties): IDocument {
        const outpuData: any = {};
        for (const k of Object.keys(inputData)) {
            const m = this.mappings[k];
            if (m) {
                const mFrags = m.split('.');
                if (mFrags.length === 1) {
                    const prop = mFrags[0];
                    outpuData[prop] = k === 'contentStreamMimeType' ? mime.getExtension(inputData[k]) : inputData[k];
                } else {
                    if (mFrags[0] === 'refs') {
                        const prop = mFrags[1];
                        outpuData.refs = outpuData.refs || [{}];
                        if (prop === 'ref0') {
                            outpuData.refs[0][prop] = (inputData[k] === true ? 'MODELE' : 'DOCUMENT');
                            continue;
                        }
                        if (inputData[k] === null || inputData[k] === undefined)
                            continue;
                        outpuData.refs[0][prop] = inputData[k] + '';
                    }
                }
            }
        }
        return outpuData;
    }
    private formatToGedData(_inputData: IDocument): IProperties {
        const inputData: any = _inputData;
        const outpuData: any = {};
        const keysMap = Object.keys(this.mappings);
        const valuesMap: string[] = Object.values(this.mappings);
        const keys: string[] = Object.keys(inputData);
        for (const k of keys) {
            if (k !== 'refs') {
                if (k === 'contentStreamFileName') {
                    outpuData[k] = inputData[k];
                } else {
                    const index = valuesMap.findIndex(item => item === k);
                    if (index !== -1) {
                        const prop = keysMap[index];
                        outpuData[prop] = k === 'typeDoc' ? mime.getType(inputData[k]) : inputData[k];
                    }
                }
            }
        }
        if (inputData.refs && inputData.refs.length) {
            for (const k of Object.keys(inputData.refs[0])) {
                const index = valuesMap.findIndex(item => item === 'refs.' + k);
                if (index !== -1) {
                    const prop = keysMap[index];
                    outpuData[prop] = k === 'ref0' ? inputData.refs[0][k] === 'MODELE' : inputData.refs[0][k];
                    outpuData[prop] = k === 'ref10' ? outpuData[prop] === 'true' : outpuData[prop];
                }
            }
        }
        return outpuData;
    }
}
