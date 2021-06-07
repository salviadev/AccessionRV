import * as boc from '@phoenix/boc';
import { Utils } from './tools/utils';
import { ExtError } from '@phoenix/server-commons';
import { IUserRights } from './rules/droits-utilisateur/definition-droits';
import * as express from 'express';
import * as basicAuth from 'basic-auth';
import { IBocRequestInfo } from '@phoenix/boc-server';
import { translator } from './tools/translator';
import { JWT } from './tools/sec';
import { settings } from './app';

export interface IAccesionUserInfo extends boc.IUserInfo {
    groups: string[];
    profId: string;
}
export interface IAccessionSessionRequestInfos {
    tenant: string;
    jwt: string;
    cookies: any;
}
export class AccessionSession extends boc.Session {
    public userRights: IUserRights;
    private _cookies: any;

    public get user(): IAccesionUserInfo {
        return super.user as IAccesionUserInfo;
    }
    public set user(value: IAccesionUserInfo) {
        super.user = value;
    }
    constructor(server: boc.Server, id: string, infos: IAccessionSessionRequestInfos) {
        super(server, id);
        const userInfo: IAccesionUserInfo = {
            userId: undefined,
            groups: undefined,
            profId: undefined,
        };
        this.user = userInfo;
        const log = this.logger.verbose(`Create session ${id}, tenant ${infos.tenant}`);
        this.info.tenant = infos.tenant;
        this._cookies = infos.cookies;
        this.info.jwt = infos.jwt;
        if (!this.extractInfosFromJwt()) {
            this.setUserInfoFromConfig();
        }
        this.logger.debug(infos.cookies, log);
    }
    public get tenant(): string {
        return this.info.tenant;
    }

    public get cookies(): any {
        return this._cookies;
    }
    public async checkRequest(request: any) {
        const rt = AccessionSessionFactory.extractTenant(request);
        if (rt !== this.tenant) {
            throw new ExtError(400, `Tenant from request ${rt} doesn't match session tenant ${this.tenant}`);
        }
    }
    public async init() {
        await super.init();
        const config = Utils.getConfig();
        this.culture = this.getCookie('CURRENT_LANG') || config.defaultCulture;
        this.findTranslatedTemplate = await translator.get(this.culture);
    }
    public async update(request: any) {
        const bocRequestInfo: IBocRequestInfo = request.bocInfo ? request.bocInfo : null;
        if (bocRequestInfo) {
            if (bocRequestInfo.token) {
                this.info.jwt = bocRequestInfo.token;
                this.extractInfosFromJwt();
            }
        }
        const newCookies = request.cookies;
        if (!newCookies) {
            return;
        }
        for (const cookieName of Object.getOwnPropertyNames(newCookies)) {
            this._cookies[cookieName] = newCookies[cookieName];
        }
        const newLang = this.getCookie('CURRENT_LANG');
        if (newLang) {
            this.culture = newLang;
            this.findTranslatedTemplate = await translator.get(this.culture);
        }
    }

    public getCookie(cookieName: string): string {
        if (!this._cookies) {
            return undefined;
        }
        return this._cookies[cookieName];
    }

    public async checkAuthentication(req: any, res: any): Promise<void> {
        const config = Utils.getConfig();
        if (config.doNotAuthenticate) {
            return;
        }
        const eReq: express.Request = req;
        const route = eReq.route.path;
        if (route.startsWith('*/api/login')) {
            this.user.userId = null;
        }
        if (!this.user.userId) {

            // export gantt
            if (route.startsWith('*/api/export-gantt'))
                return;
            // this code is temporary for Vinci
            //
            if (!route.startsWith('*/ViewModels')) {
                const auth = eReq.headers.authorization;
                if (auth) {
                    const up = basicAuth.parse(auth);
                    if (up) {
                        const userId = await this.checkPwd(up.name, up.pass);
                        if (userId) {
                            this.user.userId = userId;
                        }
                    }
                }
            }
            if (!this.user.userId) {
                const eRes: express.Response = res;
                eRes.setHeader('WWW-Authenticate', 'Basic realm="spo"');
                eRes.clearCookie(settings.bocInfoExtractorSettings.tokenCookieName);
                throw new ExtError(401, 'Unauthorized');
            }
        }
    }
    // public async checkVersion(): Promise<void> {
    //     const config = Utils.getConfig();

    //     if (!config.checkVersion) {
    //         return;
    //     }
    //     const versionAllreadyChecked = typeof this.versionOK !== 'undefined';
    //     if (versionAllreadyChecked) {
    //         return;
    //     }
    //     const message = this.lockMessage;
    //     const messages: string[] = message ? [message] : [];
    //     let versionAccessionOK = true;
    //     const os = this.objectStores.get(DataDriverNames.Accession);
    //     if (os instanceof MdrObjectStore) {
    //         const errMessage = await os.checkVersion();
    //         versionAccessionOK = !errMessage;
    //         if (!versionAccessionOK) {
    //             messages.push(`Base Accession: ${errMessage}`);
    //         }
    //     }
    //     this.versionOK = versionAccessionOK;
    //     if (messages.length) {
    //         this.lockMessage = messages.join('\n');
    //     }
    // }
    private async checkPwd(userLogin: string, pwd: string) {
        const c = this.createContainerFor('Accession');
        try {
            return userLogin;
        } finally {
            this.deleteContainer(c);
        }
    }
    private extractInfosFromJwt(): boolean {
        let result: boolean = false;
        if (this.info.jwt) {
            try {
                const payload = new JWT().verify(this.info.jwt);
                this.user.userId = payload.id;
                // this.user.groups = payload.groups;
                // this.user.profId = payload.idProf;
                result = true;

            } catch (e) {
                //
            }
        }
        return result;
    }
    private setUserInfoFromConfig() {
        if (this.user.userId) {
            return;
        }
        let userId: string = null;
        let profId: string = null;
        const config = Utils.getConfig();
        if (this.info.tenant) {
            const overrides = config.tenants[this.info.tenant];
            if (overrides && overrides.userId) {
                userId = overrides.userId;
                profId = overrides.profId;
            }
        }
        if (!userId) {
            userId = config.userId;
            profId = config.profId;
        }
        this.user.profId = profId;
        this.user.userId = userId;
    }
}
export class AccessionSessionFactory implements boc.ISessionFactory {
    public static extractTenant(request: any): string {
        const tenant: string = request && request.bocInfo ? request.bocInfo.tenant : null;
        return tenant;
    }
    public static extractJwt(request: any): string {
        const jwt: string = request && request.bocInfo ? request.bocInfo.token : null;
        return jwt;
    }
    public createSessionForRequest(server: boc.Server, idSession: string, request?: any): boc.Session {
        const tenant = AccessionSessionFactory.extractTenant(request);
        const cookies = request ? request.cookies : null;
        const jwt = AccessionSessionFactory.extractJwt(request);
        const session = new AccessionSession(server, idSession, {
            tenant,
            jwt,
            cookies,
        });
        return session;
    }
    public createSessionForTenant(server: boc.Server, idSession: string, tenant: string): boc.Session {
        const session = new AccessionSession(server, idSession, {
            tenant,
            jwt: null,
            cookies: {},
        });
        session.user.userId = 'ADMCLI';
        session.user.profId = 'ADMCLI';
        return session;
    }
}