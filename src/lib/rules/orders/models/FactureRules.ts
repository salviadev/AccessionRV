import * as boc from '@phoenix/boc';
import { Facture } from '../../../models/Facture';
import { Utils } from '../../../tools/utils';

@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class FactureRules {
    @boc.ObjectInit({
        constr: Facture,
    })
    private static async init(target: Facture, msg: boc.Message) {
        target.details.listen('details');
        if (target.objectState === boc.ObjectState.New) {
            if (!target.data.code) {
                target.data.code = 'FACT' + Utils.formatId(target.id, 8);
            }
        }
    }
    @boc.Deleting({
        constr: Facture,
    })
    private static async beforeRemove(target: Facture, msg: boc.Message) {
        const c = target.container;
        // verifier si le tiers peut etre supprimé
        await Utils.checkCanRemoveObject(target, []);
        try {
            await Utils.checkCanRemoveObject(target, []);
        } catch (e) {
            throw new boc.BOErr(c.t('La facture est utilisé.'));
        }
        // ....
    }
    @boc.BeforeSave({
        constr: Facture,
    })
    private static async beforeSave(target: Facture, msg: boc.Message) {
        if (target.isDeleted) {
            return;
        }
        const lignes = await target.details.toArray();
        for (const item of lignes) {
            // TODO
        }
        await this.checkFacture(target);
        await this.genEcritComptables(target);
    }

    private static async genEcritComptables(target: Facture) {
        if (target.objectState === boc.ObjectState.New) {
            // annuler ancien ecriture --
            // creer ecriture
        } else  if (target.objectState === boc.ObjectState.Modified) {
            if (target.oldData.refTiers !== target.refTiers || target.lignesChanged) {
                // annuler ancien ecriture --
                // creer ecriture
            }
        }
        await target.set_lignesChanged(false);
    }


    @boc.RoleChange({
        constr: Facture,
        propName: 'details'
    })
    @boc.PropChange({
        constr: Facture,
        path: 'details',
        propName: 'montant'
    })
    private static async addremoveLignes(target: Facture) {
        await target.set_lignesChanged(true);
    }
    private static async checkFacture(target: Facture) {
        const c = target.container;
        if (!target.libelle)
            throw new boc.BOErr(c.t('Le libellé doit être indiqué.'));
    }

}
