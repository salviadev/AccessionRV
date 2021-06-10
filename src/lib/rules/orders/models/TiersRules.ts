import * as boc from '@phoenix/boc';
import { Tiers } from '../../../models/Tiers';
import { Utils } from '../../../tools/utils';

@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class TiersRules {
    @boc.ObjectInit({
        constr: Tiers,
    })
    private static async init(target: Tiers, msg: boc.Message) {
        if (target.objectState === boc.ObjectState.New) {
            if (!target.data.code) {
                target.data.code = 'T' + Utils.formatId(target.id, 8);
            }
        }
    }
    @boc.Deleting({
        constr: Tiers,
    })
    private static async beforeRemove(target: Tiers, msg: boc.Message) {
        const c = target.container;
        // verifier si le tiers peut etre supprimé
        await Utils.checkCanRemoveObject(target, []);
        try {
            await Utils.checkCanRemoveObject(target, []);
        } catch (e) {
            throw new boc.BOErr(c.t('Le tiers est utilisé.'));
        }
        // ....
    }
    @boc.BeforeSave({
        constr: Tiers,
    })
    private static async beforeSave(target: Tiers, msg: boc.Message) {
        if (target.isDeleted) {
            return;
        }
        await this.checkTiers(target);
    }

    private static async checkTiers(target: Tiers) {
        const c = target.container;
        if (!target.libelle)
            throw new boc.BOErr(c.t('Le libellé doit être indiqué.'));
    }

}
