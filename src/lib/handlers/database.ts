import { CtrlBaseHandler } from '@phoenix/boc-server';
import { m } from '@phoenix/service-route';
import { DatabaseController } from '../controllers/database';

export class DatabaseHandler extends CtrlBaseHandler {
    constructor() {
        super(new DatabaseController());
    }
    @m({
        tags: ['Database'],
        description: 'Experimental: Structure actuelle de la base des données',
        responses: {
            200: {
                description: 'Experimental: Structure actuelle de la base des données',
            },
        },
    })
    public async getDatabaseStructure(): Promise<any> {
        return this.tryText(async (): Promise<any> => {
            const c = this.ctrl as DatabaseController;
            return c.getDatabaseStructure();
        });
    }
    @m({
        tags: ['Database'],
        description: 'Experimental: Script de création de la base des données',
        responses: {
            200: {
                description: 'Experimental: Script de création de la base des données',
            },
        },
    })
    public async getCreateScript(): Promise<any> {
        return this.tryText(async (): Promise<any> => {
            const c = this.ctrl as DatabaseController;
            return c.getCreateScript();
        });
    }
    @m({
        tags: ['Database'],
        description: 'Experimental: Script de mise à jour de la base des données',
        responses: {
            200: {
                description: 'Experimental: Script de mise à jour de la base des données',
            },
        },
    })
    public async getUpdateScript(): Promise<any> {
        return this.tryText(async (): Promise<any> => {
            const c = this.ctrl as DatabaseController;
            return c.getUpdateScript();
        });
    }
}
