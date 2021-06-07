import { BaseController } from '@phoenix/boc-server';
import { Spo } from '../tools/spo-direct';

export class DatabaseController extends BaseController {
    public async getDatabaseStructure(): Promise<any> {
        return Spo.databaseStructure(this.container);
    }
    public async getCreateScript(): Promise<any> {
        return Spo.databaseCreate(this.container);
    }
    public async getUpdateScript(): Promise<any> {
        return Spo.databaseUpdate(this.container);
    }

}