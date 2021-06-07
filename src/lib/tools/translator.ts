import * as boc from '@phoenix/boc';
import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
export interface IMessage {
    message: string;
    translated?: boolean;
}
export interface IMessages {
    [message: string]: IMessage;
}
export class Translator {
    private translators: Map<string, boc.FindTranslatedTemplate>;
    private dicPath: string;
    constructor(dicPath: string) {
        this.dicPath = dicPath;
        this.translators = new Map<string, boc.FindTranslatedTemplate>();
    }
    public async get(locale: string): Promise<boc.FindTranslatedTemplate> {
        if (!locale) {
            return null;
        }
        locale = locale.split('-')[0].toLowerCase();
        let f = this.translators.get(locale);
        if (!f) {
            const dic = await this.loadLocale(locale);
            f = (nativeTemplate, language) => {
                const msg = dic[nativeTemplate];
                return msg ? msg.message : nativeTemplate;
            };
            this.translators.set(locale, f);
        }
        return f;
    }
    private async loadLocale(locale: string): Promise<IMessages> {
        const dicPath = path.join(this.dicPath, `dic_${locale}.json`);
        try {
            const fileExists = await exists(dicPath);
            if (fileExists) {
                const content = await readFile(dicPath, { encoding: 'utf8' });
                const messages = JSON.parse(content) as IMessages;
                return messages;
            } else {
                return {};
            }
        } catch (e) {
            return {};
        }
    }
}

export const translator = new Translator(path.join(__dirname, '../../msg'));
