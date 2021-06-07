// import { BaseHandler } from '@phoenix/boc-server';
// import { m } from '@phoenix/service-route';
// import { ProxyHandler, IProxyInfo } from '@phoenix/boc';
// import { Utils } from '../tools/utils';
// import { ExtError } from '@phoenix/server-commons';

// export class OldLoginHandler extends BaseHandler {
//     public get checkAuthentication(): boolean {
//         return false;
//     }
//     @m({
//         tags: ['Login'],
//         summary: 'login spo',
//         parameters: [
//             {
//                 name: 'Authorization',
//                 description: 'Basic authentification',
//                 in: 'header'
//             },
//             {
//                 name: 'tenant',
//                 description: 'tenant',
//                 in: 'query',
//                 type: 'string',
//                 required: false,
//             },
//         ],
//     })
//     // tslint:disable-next-line:variable-name
//     public get(tenant: string, Authorization: string) {
//         if (!tenant) {
//             tenant = this.context.req.tenant;
//         }
//         return this.tryNotAwait(() => {
//             const config = Utils.getConfig();
//             let url: string;
//             let ignoreCertificateErrors: boolean = false;
//             if (tenant) {
//                 const overidesByTenant = config.tenants[tenant];
//                 if (overidesByTenant) {
//                     url = overidesByTenant.spoUrl;
//                     if (!url && overidesByTenant.SPO) {
//                         const spoSettings = overidesByTenant.SPO;
//                         url = spoSettings.dataUrl;
//                         ignoreCertificateErrors = spoSettings.ignoreCertificateErrors;
//                     }
//                 }
//             }
//             if (!url) {
//                 url = config.spoUrl;
//                 ignoreCertificateErrors = config.ignoreCertificateErrors;
//                 if (!url && config.defaultDataDriverSettings.SPO) {
//                     url = config.defaultDataDriverSettings.SPO.dataUrl;
//                     ignoreCertificateErrors = config.ignoreCertificateErrors;
//                 }
//             }
//             if (!url) {
//                 throw new ExtError(500, 'SPO url not configured');
//             }
//             if (!url.endsWith('/')) {
//                 url = url + '/';
//             }
//             url = url + 'M82/ServiceWCF.svc/login';
//             const p = new ProxyHandler(ignoreCertificateErrors);
//             const req = this.context.req;
//             const proxyInfo: IProxyInfo = {
//                 url,
//                 rewriteResponse: (proxyRes, req1, res) => {
//                     const cookies = proxyRes.headers['set-cookie'];
//                     if (Array.isArray(cookies)) {
//                         cookies.push(`${config.sessionSettings.cookieName}=${this.session.id}; path=/`);
//                     }
//                 }
//             };
//             req.proxyInfo = proxyInfo;
//             p.handler(req, this.context.res, this.context.next)
//                 .catch((err: any) => {
//                     this.context.next(err);
//                 });
//         });
//     }
// }