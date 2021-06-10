import * as boc from '@phoenix/boc';
import { Facture } from '../../../../models/Facture';
import { Utils } from '../../../../tools/utils';
import { FactureItemView } from '../../../../views/factures/list/FactureItemView';
import { FacturesView } from '../../../../views/factures/list/FacturesView';

const ACTIONS = {
    remove: 'factures.remove',
};
@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class FacturesViewRules {

    public static initMetadata(m: boc.ModelMetadata) {
        m.registerActions(FacturesView,
            {
                id: ACTIONS.remove,
                title: ACTIONS.remove,
                saveAfter: false,
            }
        );
    }
    @boc.Action({
        constr: FacturesView,
        actionId: ACTIONS.remove,
    })
    private static async removeFacture(target: FacturesView, msg: boc.Message) {
        let error = null;
        if (msg.data && msg.data.length) {
            const id: number = msg.data[0];
            const factureView = target.container.getOneInMem<FactureItemView>(FactureItemView, { id });
            if (!factureView) return;
            await target.container.usingNewContainer(async (c) => {
                try {
                    const tiers = await c.getOne<Facture>(Facture, { code: factureView.code });
                    if (!tiers)
                        throw new boc.BOErr(c.t('La facture "{{0}}" n\'existe pas', factureView.libelle));
                    await tiers.toDelete();
                    const saveResult = await c.save();
                    Utils.checkAfterSave(c, saveResult);
                } catch (e) {
                    error = e;
                }
            });
            if (error)
                throw error;
            await target.factures.load();
        }
    }
}