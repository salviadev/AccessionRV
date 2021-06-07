import { BaseController } from '@phoenix/boc-server';
import { JWT } from '../tools/sec';
import { AccessionSession } from '../accession-session';
import { Utils } from '../tools/utils';

export class LoginController extends BaseController {
    public async get(tenant: string, res: any): Promise<string> {
        const c = this.container;
        const jwt = new JWT();
        const token = await jwt.getToken(c);
        const config = Utils.getConfig();
        if (!config.apiConfig || !config.apiConfig.doNotSetCookieOnLogin) {
            tenant = (this.session as AccessionSession).info.tenant;
            res.cookie('tenant', tenant);
            res.cookie('jwt', token);
        }
        return token;
    }
}