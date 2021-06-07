import * as boc from '@phoenix/boc';

export class SpoRights {
    public static operationsAxe = 'DOMOPE';
    public static PROFID = 'ADMCLI';
    public static readRights = [1, 3, 5, 7];
    public static async userId(container: boc.Container): Promise<string> {
        return container.sessionServices.user.userId;
    }
    public static async isAdmin(container: boc.Container): Promise<boolean> {
        return true;
    }
    public static async applyOperationsRights(container: boc.Container): Promise<boolean> {
        if (!container.sessionServices.rights) return false;
        return !await this.isAdmin(container);
    }

}
