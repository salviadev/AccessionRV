import { CtrlBaseHandler } from '@phoenix/boc-server';
import { m } from '@phoenix/service-route';
import { DocMergeCtrl, GedCtrl, DownloaderFileCtrl } from '../controllers/uploadDownload';

export class DownloaderFileHandler extends CtrlBaseHandler {
    constructor() {
        super(new DownloaderFileCtrl());
    }

    @m({
        tags: ['Export'],
        description: 'Téléchargement des fichiers templates',
        produces: [
            'application/msword',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ],
        parameters: [
            {
                name: 'file',
                description: 'filename => appel-fond.docx',
                in: 'path'
            }
        ],
        responses: {
            200: {
                description: 'OK',
                schema: {
                    type: 'file',
                },
            },
        },
    })
    // tslint:disable-next-line:max-line-length
    public async downloadTemplates(file: string) {
        return this.tryNotAwait((): void => {
            const c = this.ctrl as DownloaderFileCtrl;
            // tslint:disable-next-line:no-floating-promises
            c.downloadTemplates(file, this.context.req, this.context.res);
        });
    }
}

export class TemporaryFolderHandler extends CtrlBaseHandler {
    constructor() {
        super(new DownloaderFileCtrl());
    }

    @m({
        tags: ['Temporary Folder'],
        description: 'Téléchargement de fichiers',
        parameters: [
            {
                name: 'key',
                in: 'path'
            }
        ],
        responses: {
            200: {
                description: 'OK',
                schema: {
                    type: 'file',
                },
            },
        },
    })
    // tslint:disable-next-line:max-line-length
    public async getOne(key: string) {
        return this.tryNotAwait((): void => {
            const c = this.ctrl as DownloaderFileCtrl;
            // tslint:disable-next-line:no-floating-promises
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            c.downloadTmpFile(key, this.context.req, this.context.res); 
        });
    }

    @m({
        tags: ['Temporary Folder'],
        description: 'Upload de fichiers',
        responses: {
            200: {
                description: 'OK',
                schema: {
                    type: 'file',
                },
            },
        },
    })
    // tslint:disable-next-line:max-line-length
    public async post(filename: string) {
        return this.tryNotAwait((): void => {
            const c = this.ctrl as DownloaderFileCtrl;
            // tslint:disable-next-line:no-floating-promises
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            c.uploadTmpFile(filename, this.context.req, this.context.res);
        });
    }
}

export class DocMergeHandler extends CtrlBaseHandler {

    constructor() {
        super(new DocMergeCtrl());
    }

    @m({
        tags: ['Export'],
        description: 'Proxy de téléchargement de fichiers',
        responses: {
            200: {
                description: 'OK',
                schema: {
                    type: 'file',
                },
            },
        },
    })
    // tslint:disable-next-line:max-line-length
    public async getOne(key: string, filename: string) {
        return this.tryNotAwait((): void => {
            const c = this.ctrl as DocMergeCtrl;
            // tslint:disable-next-line:no-floating-promises
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            c.download(key, filename, this.context.req, this.context.res);
        });
    }
}

export class GedHandler extends CtrlBaseHandler {

    constructor() {
        super(new GedCtrl());
    }

    @m({
        tags: ['Export'],
        description: 'Proxy de download de fichiers',
        responses: {
            200: {
                description: 'OK',
                schema: {
                    type: 'file',
                },
            },
        },
    })
    // tslint:disable-next-line:max-line-length
    public async getOne(key: string) {
        return this.tryNotAwait((): void => {
            const c = this.ctrl as GedCtrl;
            // tslint:disable-next-line:no-floating-promises
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            c.download(key, this.context.req, this.context.res);
        });
    }
}

// export class DownloadFileHandler extends CtrlBaseHandler {

//     constructor() {
//         super(new DownloadFileCtrl());
//     }

//     @m({
//         tags: ['Export'],
//         description: 'Génère le fichier de paramétrage {key} et le renvoie',
//         responses: {
//             200: {
//                 description: 'OK',
//                 schema: {
//                     type: 'file',
//                 },
//             },
//         },
//         parameters: [
//             {
//                 name: 'key',
//                 description: 'Clé',
//                 in: 'query',
//                 type: 'string',
//                 required: true,
//             },
//             {
//                 name: 'idContainer',
//                 description: 'Id du container',
//                 in: 'query',
//                 type: 'string',
//                 required: true,
//             },
//         ],
//     })
//     // tslint:disable-next-line:max-line-length
//     public async get(key: string, idContainer: string) {
//     return this.tryDownload(async (): Promise<DownloadFileResponse> => {
//         const c = this.ctrl as DownloadFileCtrl;
//         return c.process(key, idContainer);
//     });
// }
// }

// {
//     "path": "/api/download",
//     "controller": "DownloadFileHandler",
//     "file": "downloadFile",
//     "model": "DownloadFile"
// },
