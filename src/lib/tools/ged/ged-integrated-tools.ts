import { Utils } from '../utils';
import { IDocument, IFile } from './ged-interfaces';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime';
import * as boc from '@phoenix/boc';
import { GedDocument } from '../../models/GedDocument';
import { GedDocumentReference } from '../../models/GedDocumentReference';
import { GedFichier } from '../../models/GedFichier';
import { IDataDriverOptions } from '@phoenix/boc-interfaces';
import { DataDriverNames } from '../../interfaces';

export class GedMiniHelper {
    private storagePath: string;
    private storageFullPath: string;
    private container: boc.Container;
    constructor(container: boc.Container, storagePath: string) {
        this.storagePath = storagePath;
        if (!this.storagePath) {
            throw new boc.BOErr(container.t('Invalid gedStoragePath'));
        }
        this.container = container;
    }

    public async createDocument(data: IDocument): Promise<IDocument> {
        if (!data) { return null; }
        if (!data.code) {
            data.code = Utils.uuid22();
        }
        let error = null;
        await this.container.usingNewContainer(async (c) => {
            try {
                const refs = data.refs;
                delete data.refs;
                const doc = await c.createNew<GedDocument>(GedDocument, null, null, false, data);
                if (refs && refs.length) {
                    for (const ii of refs) {
                        const item = await c.createNew<GedDocumentReference>(GedDocumentReference, null, null, false, ii);
                        await doc.refs.link(item);
                    }
                }
                const saveResult = await c.save();
                Utils.checkAfterSave(c, saveResult);
            } catch (e) {
                error = e;
            }
        });
        if (error) {
            throw error;
        }
        return await this.getDocument(data.code);
    }

    public async getDocument(code: string): Promise<IDocument> {
        if (!code)
            return null;
        const doc: any = await this.container.getDataObject<IDocument>(GedDocument, {
            filter: { code },
            entities: {
                fichier: {
                    entityName: 'GedFichier',
                    select: ['code', 'nomFichier']
                }
            },
            select: defaultSelect(),
            join: [
                { entity: 'refs', type: 'expand' },
                { entity: 'fichier', type: 'expand', multiplicity: 'one', condition: { refFichier: 'code' } },
            ],
        }, DataDriverNames.SpoDirect);
        if (doc.fichier && doc.fichier.nomFichier) {
            doc.contentStreamFileName = doc.fichier.nomFichier;
            delete doc.fichier;
        }
        return doc;

    }
    public async getDocuments(select: string[], filter: any): Promise<any[]> {
        if (!select || !select.length)
            select = defaultSelect();
        select.push('id');
        const docs = await this.container.getDataObjects<any>(GedDocument, {
            select,
            entities: {
                fichier: {
                    entityName: 'GedFichier',
                    select: ['code', 'nomFichier']
                }
            },
            join: [
                { entity: 'refs', type: 'left' },
                { entity: 'fichier', type: 'left', condition: { refFichier: 'code' } }
            ],
            filter,
        }, DataDriverNames.SpoDirect);
        const map = new Map<number, any>();
        const res: any[] = [];
        for (const item of docs) {
            const keys = Object.keys(item);
            let doc = map.get(item.id);
            if (!doc) {
                doc = { refs: [] };
                for (const propname of keys) {
                    if (!propname.startsWith('refs_') && !propname.startsWith('fichier_')) {
                        doc[propname] = item[propname];
                    } else if (propname === 'fichier_nomFichier') {
                        doc.contentStreamFileName = item[propname];
                    }
                }
                map.set(item.id, doc);
                res.push(doc);
            }
            let ref: any = null;
            for (const propname of keys) {
                if (propname.startsWith('refs_')) {
                    ref = ref || {};
                    ref[propname.substr(5)] = item[propname];
                }
            }
            if (ref) doc.refs.push(ref);
        }
        return res;
    }

    public async updateDocument(code: string, data: any): Promise<IDocument> {
        if (!code || !data) {
            return null;
        }
        let error = null;
        await this.container.usingNewContainer(async (c) => {
            try {
                const refs = data.refs;
                delete data.refs;
                delete data.code;
                const doc = await c.getOne<GedDocument>(GedDocument, { code });
                if (doc) {
                    const props = Object.getOwnPropertyNames(data);
                    for (const prop of props) {
                        await doc.setProp(prop, data[prop]);
                    }
                    if (refs && refs.length) {
                        const oldRefs = await doc.refs.toArray();
                        for (const ii of refs) {
                            const oldRef = oldRefs.find((ref: GedDocumentReference) => ref.id === ii.id);
                            const refProps = Object.getOwnPropertyNames(ii);
                            for (const prop of refProps) {
                                if (prop !== 'id') {
                                    await oldRef.setPropNoRuleExecution(prop, ii[prop]);
                                }
                            }
                        }
                    }
                    const saveResult = await c.save();
                    Utils.checkAfterSave(c, saveResult);
                }

            } catch (e) {
                error = e;
            }
        });
        if (error) {
            throw error;
        }
        return this.getDocument(code);
    }
    public async deleteDocument(code: string) {
        if (!code) {
            return;
        }
        let error = null;
        await this.container.usingNewContainer(async (c) => {
            try {
                const doc = await c.getOne<GedDocument>(GedDocument, { code });
                if (doc) {
                    let fileId: number = 0;
                    let fileExt: string = null;
                    if (doc.refFichier) {
                        const fileDB = await c.getOne<GedFichier>(GedFichier, { code: doc.refFichier });
                        if (fileDB) {
                            fileId = fileDB.id;
                            fileExt = fileDB.typeFichier;
                            await fileDB.toDelete();
                        }
                    }
                    await doc.toDelete();

                    const saveResult = await c.save();
                    Utils.checkAfterSave(c, saveResult);
                    if (fileId) {
                        const fileName = await this.fullFileName(fileId, fileExt);
                        try {
                            await fs.promises.unlink(fileName);
                        } catch (e) {
                            console.log(e);
                            // nothing
                        }
                    }
                }

            } catch (e) {
                error = e;
            }
        });
        if (error) {
            throw error;
        }
    }

    public async uploadFile(url: string): Promise<string> {
        let fileStat: fs.Stats = null;
        try {
            fileStat = await fs.promises.stat(url);
        } catch (e) {
            throw new boc.BOErr(this.container.t('"{{0}}" n\'est pas un fichier', url));
        }
        if (!fileStat.isFile()) {
            throw new boc.BOErr(this.container.t('"{{0}}" n\'est pas un fichier', url));
        }
        const ext = (path.extname(url) || '').substring(1);
        const name = path.basename(url);
        let fileId: number = 0;
        let fileCode: string = null;
        let error = null;
        await this.container.usingNewContainer(async (c) => {
            try {
                const fileDB = await c.createNew<GedFichier>(GedFichier);
                await fileDB.set_nomFichier(name);
                await fileDB.set_typeFichier(ext);
                await fileDB.set_tailleFichier(fileStat.size);
                const saveResult = await c.save();
                Utils.checkAfterSave(c, saveResult);
                fileId = fileDB.id;
                fileCode = fileDB.code;
            } catch (e) {
                error = e;
            }
        });
        if (error) {
            throw error;
        }
        // Move file
        const dst = await this.fullFileName(fileId, ext);
        try {
            let doCopy = false;
            try {
                await fs.promises.rename(url, dst);
            } catch (ex) {
                doCopy = true;
            }
            if (doCopy) {
                await fs.promises.copyFile(url, dst);
                try {
                    await fs.promises.unlink(url);
                } catch (exRemove) {
                    // Nothing to do
                }
            }
        } catch (e) {
            await this.container.usingNewContainer(async (c) => {
                try {
                    const fileDB = await c.getOne<GedFichier>(GedFichier, { id: fileId });
                    if (fileDB) {
                        await fileDB.toDelete();
                        await c.save();
                    }

                } catch (exs) {
                    // Nothing
                }
            });
            throw new boc.BOErr(this.container.t('Impossible de deplacer le fichier "{{0}}" dans "{{1}}" \n {{2}}', url, dst, e.message));
        }
        return fileCode;
    }

    public async downloadFile(code: string): Promise<any> {
        let error = null;
        let fileId: number = 0;
        let fileExt: string = null;
        await this.container.usingNewContainer(async (c) => {
            try {
                const fileDB = await c.getOne<GedFichier>(GedFichier, { code });
                if (fileDB) {
                    fileId = fileDB.id;
                    fileExt = fileDB.typeFichier;
                } else {
                    throw new boc.BOErr(c.t('Fichier non trouvé'));
                }

            } catch (e) {
                error = e;
            }
        });
        if (error) {
            throw error;
        }
        const fileName = await this.fullFileName(fileId, fileExt);
        let fileStat: fs.Stats = null;
        try {
            fileStat = await fs.promises.stat(fileName);
        } catch (e) {
            throw new boc.BOErr(this.container.t('"{{0}}" n\'est pas un fichier', fileName));
        }
        if (!fileStat.isFile()) {
            throw new boc.BOErr(this.container.t('"{{0}}" n\'est pas un fichier', fileName));
        }
        return fs.createReadStream(fileName);
    }

    public async getFile(code: string): Promise<IFile> {
        let res: IFile = null;

        await this.container.usingNewContainer(async (c) => {
            const fileDB = await c.getOne<GedFichier>(GedFichier, { code });
            if (fileDB) {
                res = {
                    code: fileDB.code,
                    nomFichier: fileDB.nomFichier,
                    typeFichier: fileDB.typeFichier,
                    tailleFichier: (fileDB.tailleFichier || 0) + '',
                };
            }
        });
        return res;
    }
    public async deleteFile(code: string) {
        let error = null;
        await this.container.usingNewContainer(async (c) => {
            try {
                let fileId: number = 0;
                let fileExt: string = null;
                const fileDB = await c.getOne<GedFichier>(GedFichier, { code });
                if (fileDB) {
                    fileId = fileDB.id;
                    fileExt = fileDB.typeFichier;
                    await fileDB.toDelete();
                    const saveResult = await c.save();
                    Utils.checkAfterSave(c, saveResult);

                }
                if (fileId) {
                    const fileName = await this.fullFileName(fileId, fileExt);
                    try {
                        await fs.promises.unlink(fileName);
                    } catch (e) {
                        console.log(e);
                        // nothing
                    }
                }
            } catch (e) {
                error = e;
            }
        });
        if (error) {
            throw error;
        }
    }
    private async fullFileName(id: number, ext: string): Promise<string> {
        if (!this.storageFullPath) {
            this.storageFullPath = this.storagePath;
            const os = await this.container.getObjectStore(GedFichier);
            const dataDriver = os.getDataDriver();
            let tenantId = dataDriver.tenantIdValue || 1;
            const dataDriverOptions = os.getDataDriver().options as IDataDriverOptions;
            if (dataDriverOptions.tenantId) {
                tenantId = dataDriverOptions.tenantId;
            }
            if (tenantId) {
                this.storageFullPath = this.storageFullPath + '/' + tenantId;
            }
            this.storageFullPath = path.normalize(this.storageFullPath);
            let fileStat: fs.Stats = null;
            let tryCreate: boolean;
            try {
                fileStat = await fs.promises.stat(this.storageFullPath);
            } catch (e) {
                tryCreate = true;
            }
            if (tryCreate) {
                await fs.promises.mkdir(this.storageFullPath);
            }
        }
        if (ext) {
            const ct = mime.getType('xxx.' + ext);
            if (ct)
                ext = mime.getExtension(ct);
        }
        const fileName = 'GedFichier_dataFichier_' + (id + '') + (ext ? ('.' + ext) : '');
        return path.resolve(this.storageFullPath, fileName);
    }
}

function defaultSelect(): string[] {
    return [
        'id', 'code', 'libelle', 'dateCreation', 'dateModif', 'commentaire', 'proprietaire', 'classement', 'typeDoc', 'tailleFichier', 'refFichier', 'stockage',
        'refs.id', 'refs.ref0', 'refs.ref1', 'refs.ref2', 'refs.ref3', 'refs.ref4', 'refs.ref5', 'refs.ref6', 'refs.ref7', 'refs.ref8', 'refs.ref9', 'refs.ref10',
        'refs.ref11', 'refs.ref12', 'refs.ref13', 'refs.ref14', 'refs.ref15', 'refs.ref16', 'refs.ref17', 'refs.ref18',
        'refs.ref19', 'refs.ref20', 'fichier.nomFichier'
    ];
}