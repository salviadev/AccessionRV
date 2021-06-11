import { BaseController } from '@phoenix/boc-server';
import { DocMerge } from '../tools/doc-merge';
import { Utils } from '../tools/utils';
import { ExportExcel } from '../tools/export-excel';
import * as fs from 'fs';
import * as path from 'path';
import { UrlType } from '../tools/ged/ged';
import * as multer from 'multer';
import { urlencoded } from 'body-parser';
import mime = require('mime');
import * as express from 'express';

const httpProxy = require('http-proxy'); // eslint-disable-line @typescript-eslint/no-var-requires
const secureProxy = httpProxy.createProxyServer({
    secure: true
});
const inSecureProxy = httpProxy.createProxyServer({
    secure: false
});
export abstract class BaseCtrl extends BaseController {
    public proxy(proxyServer: any, req: any, res: any, url: { hostname: string, path: string }): void {
        delete req.headers.host;
        req.url = url.path;
        proxyServer.web(req, res, { target: url.hostname });
        proxyServer.on('error', (err: any) => {
            console.error(err.toString());
        });
    }
    protected getProxyServer(ignoreCertificateErrors: boolean) {
        return ignoreCertificateErrors ? inSecureProxy : secureProxy;
    }
}

export class DownloaderFileCtrl extends BaseController {
    public async downloadTmp(key: string, req: any, res: any): Promise<void> {
        const ctr = this.controller();
        const filePath = ctr.outputFilePath(key);
        res.download(filePath, ctr.outputFileName(key), (err: any) => {
            fs.unlink(filePath, (err1: any) => {
                //
            });
        });
    }

    public async downloadTmpFile(key: string, req: any, res: any): Promise<void> {
        const filePath = path.join(Utils.tmpFolder, key);
        res.download(filePath, key, (err: any) => {
            fs.unlink(filePath, (err1: any) => {
                //
            });
        });
    }

    public async uploadTmpFile(filename: string, request: any, response: any): Promise<void> {
        try {
            let name: string;
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, Utils.tmpFolder);
                },
                filename: (req, file, cb) => {
                    cb(null, name = filename ? filename + path.extname(file.originalname) : file.originalname);
                }
            });
            const upload = multer({ storage }).single('file');
            upload(request, response, (err: any) => {
                if (err) {
                    return response.status(400).end();
                }
                response.status(200).json({ code: name });
            });
        } catch (e) {
            response.status(500).send(e.message);
        }
    }

    public downloadTemplates(file: string, req: any, res: any): void {
        const filePath = path.join(Utils.templatesFolder, file);
        res.download(filePath, file);
    }

    protected controller() {
        return new ExportExcel();
    }
}

export class DocMergeCtrl extends BaseCtrl {
    public async download(key: string, filename: string, req: any, res: any): Promise<void> {
        const connectionInfo = await this.controller().downloadUrl(key, filename);
        const proxy = this.getProxyServer(connectionInfo.ignoreCertificateErrors);
        this.proxy(proxy, req, res, connectionInfo.url);
    }

    protected controller() {
        return new DocMerge(this.container);
    }
}

export class GedCtrl extends BaseCtrl {
    public async download(key: string, req: express.Request, res: express.Response): Promise<void> {
        try {
            const ctrl = await this.controller();
            const meta = await ctrl.getMeta(key);
            const outputPath = path.join(Utils.tmpFolder, Utils.uuid22());
            await ctrl.downloadContent(key, outputPath);
            let filename = meta.contentStreamFileName || key;
            if (!path.extname(filename)) {
                filename = filename + '.' + mime.getExtension(meta.contentStreamMimeType);
            }
            res.download(outputPath, filename, (err: any) => {
                fs.unlink(outputPath, (err1: any) => {
                    //
                });
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
    protected async controller() {
        return Utils.createGed(this.container);
    }
}

// enum DownloadFileType {
//     EXCEL = '.xlsx',
//     PDF = '.pdf',
//     WORD = '.docx',
// }

// class TemplateFileType {
//     public static getTemplate(fileType: DownloadFileType): DownloadFileType {
//         switch (fileType) {
//             case DownloadFileType.PDF: return DownloadFileType.WORD;
//             default: return fileType;
//         }
//     }
// }

// export class DownloadFileCtrl extends BaseController {

//     public async process(key: string, idContainer: string): Promise<any> {
//         const c: boc.Container = this.session.containers.get(idContainer);
//         if (!c) {
//             throw new ExtError(400, 'Container introuvable');
//         }
//         // Config
//         const config: any = Utils.getExportConfig();
//         if (!config) {
//             throw new ExtError(400, 'Fichier de configuration serveur manquant');
//         }
//         // Get json data
//         const fullData: any = await c.cache.get(key);
//         // Type
//         if (!fullData.type) {
//             throw new ExtError(400, 'Type de format d\'export manquant');
//         }
//         const type = this.getExportTypeByType(fullData.type.toUpperCase());
//         if (!type) {
//           throw new ExtError(400, 'Format d\'export invalide : seuls \'EXCEL\', \'PDF\' et \'WORD\' sont acceptés');
//         }
//         // Template
//         if (!fullData.template) {
//             throw new ExtError(400, 'Template manquant');
//         }
//         const templatePath: string = this.getTemplatePath(config, fullData.template, type);
//         if (!await util.promisify(fs.exists)(templatePath)) {
//             throw new ExtError(400, 'Template inexistant');
//         }
//         const templateBuffer: Buffer = await util.promisify(fs.readFile)(templatePath);
//         // FileName
//         if (!fullData.fileName) {
//             throw new ExtError(400, 'Nom du fichier de sortie manquant');
//         }
//         const fileName = this.getFileName(fullData.fileName, type);

//         let file: (Buffer | ArrayBuffer) = null;
//         switch (type) {
//             case DownloadFileType.WORD: file = this.getWord(templateBuffer, fullData.xdata); break;
//             case DownloadFileType.PDF:
//                 const wordFile: ArrayBuffer = this.getWord(templateBuffer, fullData.xdata);
//                 const id: string = uuid();
//                 const wordPath: string = path.join(config.tmp, id + DownloadFileType.WORD);
//                 const pdfPath: string = path.join(config.tmp, id + DownloadFileType.PDF);
//                 await util.promisify(fs.writeFile)(wordPath, wordFile);
//                 file = await this.doc2Pdf(config, wordPath, pdfPath);
//                 break;
//             default: throw new ExtError(400, 'Export momentanément indisponible');
//         }
//         return new DownloadFileResponse(file, fileName);
//     }

//     private getWord(template: Buffer, data: any): ArrayBuffer {
//         return templateDocX.process(template, data);
//     }

//     private async doc2Pdf(config: any, wordPath: string, pdfPath: string): Promise<Buffer> {
//         /*
//         const doc2PdfPath: string = path.join(config.tools.path, config.tools.doc2pdf);
//         const clrMethod: any = edge.func({
//             assemblyFile: path.join(doc2PdfPath, 'DocConverter.dll'),
//             typeName: 'DocConverter.DocConverterUtil',
//             methodName: 'ConvertDocToPDF', // This must be Func<object,Task<object>>
//         });

//         const pathDllAspose: string = path.join(doc2PdfPath, 'AsposeWordUtil.dll');
//         const docConverter: any = edge.func(`
//             #r "${pathDllAspose}"
//             using System;
//             using System.Threading.Tasks;
//             public class Startup
//             {
//                 public async Task<object> Invoke(object input)
//                 {
//                     dynamic o = input;
//                     ConvertDocToPDF(o.src, o.dst);
//                     return true;
//                 }
//                 public static void ConvertDocToPDF(string src, string dst)
//                 {
//                     AsposeWordUtil.AsposeHelper.ConvertDocToPDF(src, dst);
//                 }
//             }
//         `);
//         const x = await util.promisify(docConverter)({ src: wordPath, dst: pdfPath });
//         */
//         const command: string = path.join(config.tools.doc2pdf) + ' ' + wordPath + ' ' + pdfPath;
//         const x = await util.promisify(childProcess.exec)(command);
//         if (x.stderr && x.stderr.length) {
//             throw new ExtError(400, 'Erreur lors de la conversation PDF');
//         }
//         const pdf: Buffer = await util.promisify(fs.readFile)(pdfPath);
//         // Suppression des fichiers word et pdf - sans attendre la réponse !?
//         util.promisify(fs.unlink)(wordPath);
//         util.promisify(fs.unlink)(pdfPath);
//         return pdf;
//     }

//     private getExportTypeByType(type: string): DownloadFileType {
//         if (typeof type !== 'string') {
//             return null;
//         }
//         switch (type) {
//             case 'EXCEL': return DownloadFileType.EXCEL;
//             case 'PDF': return DownloadFileType.PDF;
//             case 'WORD': return DownloadFileType.WORD;
//             default: return null;
//         }
//     }

//     private getTemplatePath(config: any, template: string, type: DownloadFileType): string {
//         const templateName: string = this.getFileName(template, TemplateFileType.getTemplate(type));
//         return path.join(config.templatePath, templateName);
//     }

//     private getFileName(fileName: string, type: DownloadFileType): string {
//         if (fileName.indexOf('.') === -1) {
//             return fileName += type;
//         }
//     }

//     private async getFullData(config: any, key: string): Promise<any> {
//         const dataPath: string = path.join(config.data, key + '.json');
//         if (!await util.promisify(fs.exists)(dataPath)) { return null; }
//         return Utils.getJSONFile(dataPath);
//     }
// }