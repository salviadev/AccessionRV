import * as boc from '@phoenix/boc';
import { Tiers } from '../../../../models/Tiers';
import { Utils } from '../../../../tools/utils';
import { TiersItemView } from '../../../../views/tiers/list/TiersItemView';
import { TiersView } from '../../../../views/tiers/list/TiersView';

const ACTIONS = {
    remove: 'tiers.remove',
};
@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class TiersViewRules {

    public static initMetadata(m: boc.ModelMetadata) {
        m.registerActions(TiersView,
            {
                id: ACTIONS.remove,
                title: ACTIONS.remove,
                saveAfter: false,
            }
        );
    }
    @boc.Action({
        constr: TiersView,
        actionId: ACTIONS.remove,
    })
    private static async removeTiers(target: TiersView, msg: boc.Message) {
        let error = null;
        if (msg.data && msg.data.length) {
            const id: number = msg.data[0];
            const tiersView = target.container.getOneInMem<TiersItemView>(TiersItemView, { id });
            if (!tiersView) return;
            await target.container.usingNewContainer(async (c) => {
                try {
                    const tiers = await c.getOne<Tiers>(Tiers, { code: tiersView.code });
                    if (!tiers)
                        throw new boc.BOErr(c.t('Le tiers "{{0}}" n\'existe pas', tiersView.libelle));
                    await tiers.toDelete();
                    const saveResult = await c.save();
                    Utils.checkAfterSave(c, saveResult);
                } catch (e) {
                    error = e;
                }
            });
            if (error)
                throw error;
            await target.tiers.load();
        }
    }
}