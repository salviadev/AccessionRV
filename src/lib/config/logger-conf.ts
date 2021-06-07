import * as winston from 'winston';
import * as Transport from 'winston-transport';
import DailyRotateFile = require('winston-daily-rotate-file');
import * as path from 'path';
import * as fs from 'fs';
import { LogLevel, stringify} from '@phoenix/logger';

import { Utils } from '../tools/utils';
import { IAccessionRVConfig } from '../interfaces';

const datePatern = '%DATE%';
const options: IAccessionRVConfig = Utils.getOptions();
const level: LogLevel | 'none' = options.log && options.log.level ? options.log.level : 'error';
let winstonLogger = null;

if (level !== 'none') {
    let logDir: string = options.log && options.log.logDirectory ? options.log.logDirectory : 'logs';
    if (!path.isAbsolute(logDir)) {
        logDir = path.join(Utils.rootFolder, logDir);
    }
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    let fileName = options.log && options.log.logFileName ? options.log.logFileName : 'accession.log';
    const fileNameWithoutDatePatern = fileName.replace(datePatern, '');
    const extension = path.extname(fileNameWithoutDatePatern);
    const auditFile = path.join(logDir, '.'.concat(
        fileNameWithoutDatePatern.substring(0, fileNameWithoutDatePatern.length - extension.length), extension, '-audit.json')
    );

    if (!fileName.includes('%DATE%')) {
        fileName = fileName.substr(0, fileName.length - extension.length).concat('-', datePatern, extension);
    }
    const stringFormat = stringify();
    const transports: Transport[] = [
        new DailyRotateFile({
            level,
            dirname: logDir,
            filename: fileName,
            auditFile,
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
            format: stringFormat,
        }),
        // new winston.transports.File({
        //     filename: logFileName,
        //     level,
        //     maxsize: 1024 * 1024 * 10,
        //     maxFiles: 5,
        //     format: stringFormat,
        // }),
    ];
    winstonLogger = winston.createLogger({
        transports,
    });
}

module.exports = winstonLogger;