import { m } from '@phoenix/service-route';
import { CtrlBaseHandler } from '@phoenix/boc-server';
import { LoginController } from '../controllers/login';
import * as accepts from 'accepts';

export class LoginHandler extends CtrlBaseHandler {
    public get stateless() {
        return true;
    }
    private get loginCtrl(): LoginController {
        return this.ctrl as LoginController;
    }
    constructor() {
        super(new LoginController());
    }
    public get checkAuthentication(): boolean {
        return true;
    }
    @m({
        tags: ['Login'],
        summary: 'login spo',
        parameters: [
            {
                name: 'Authorization',
                description: 'Basic authentification',
                in: 'header'
            },
            {
                name: 'tenant',
                description: 'tenant',
                in: 'query',
                type: 'string',
                required: false,
            },
        ],
    })
    // tslint:disable-next-line: variable-name
    public get(tenant: string, Authorization: string) {
        const a = accepts(this.context.req);
        const acceptJSON = a.type(['text', 'json']) === 'json';
        const tokenGetter = () => this.loginCtrl.get(tenant, this.context.res);
        if (acceptJSON) {
            return this.try(async () => {
                const token = await tokenGetter();
                return { token };
            });
        } else {
            return this.tryText(tokenGetter);
        }
    }
}