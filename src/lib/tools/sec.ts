import { Utils } from './utils';
import * as boc from '@phoenix/boc';
import * as jwt from 'jsonwebtoken';

export interface IJWTContent {
    id: string;
    login: string;
    groups: string[];
}

export class JWT {
    private get secret() {
        return Utils.getConfig().jwtSecret;
    }
    public async getToken(c: boc.Container): Promise<string> {
        const payload = await this.getContent(c);
        return jwt.sign(payload, this.secret, {
            expiresIn: 1440 * 60,
            issuer: 'SALVIASPO',
        });
    }
    public verify(token: string): IJWTContent {
        return jwt.verify(token, this.secret) as IJWTContent;
    }
    private async getContent(c: boc.Container): Promise<IJWTContent> {
        return { id: 'ADM', login: 'ADM', groups: [] };
    }
}