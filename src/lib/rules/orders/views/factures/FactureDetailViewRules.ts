import * as boc from '@phoenix/boc';
import { Facture } from '../../../../models/Facture';
import { FactureDetail } from '../../../../models/FactureDetail';
import { Tiers } from '../../../../models/Tiers';
import { FactureDetailView } from '../../../../views/factures/detail/FactureDetailView';
import { FactureMntView } from '../../../../views/factures/detail/FactureMntView';

const ACTIONS = {
    remove: 'lignes.remove',
    add: 'lignes.add',
};
@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class FactureDetailViewRules {
    public static initMetadata(m: boc.ModelMetadata) {
        m.registerActions(FactureDetailView,
            {
                id: ACTIONS.remove,
                title: ACTIONS.remove,
                saveAfter: false,
            },
            {
                id: ACTIONS.add,
                title: ACTIONS.remove,
                saveAfter: false,
            }
        );
    }
    @boc.ObjectInit({
        constr: FactureDetailView,
    })
    private static async init(target: FactureDetailView, msg: boc.Message) {
        const c = target.container;
        const facture = msg.data.code ? await c.getOne<Facture>(Facture, { code: msg.data.code }) :
            await c.createNew<Facture>(Facture);
        if (!facture) {
            throw new boc.FatalError(c.t('La facture "{{0}}" n\'existe pas.', msg.data.code));
        }
        await target.set_model(facture);
    }

    @boc.Action({
        constr: FactureDetailView,
        actionId: ACTIONS.add,
    })
    private static async addLine(target: FactureDetailView, msg: boc.Message) {
        const c = target.container;
        if (target.model) {
            const item = await c.createNew<FactureDetail>(FactureDetail);
            await target.model.details.link(item);
        }
    }

    @boc.Action({
        constr: FactureDetailView,
        actionId: ACTIONS.remove,
    })
    private static async removeLine(target: FactureDetailView, msg: boc.Message) {
        if (msg.data && msg.data.length) {
            const ids = msg.data;
            const allItems = await target.lignes.toArray();
            const itemsToRemove = boc.ObjectFilter.filter<FactureMntView>({ id: { $in: ids } }, allItems);

            for (const item of itemsToRemove) {
                const model = item.model;
                await model.toDelete();
            }
        }
    }
    @boc.ModelChanged({
        constr: FactureDetailView,
    })
    private static async modelChanged(target: FactureDetailView, msg: boc.Message) {
        const tiers = target.model ? await target.model.tiers() : null;
        target.mappings.fromModel = true;
        try {
            await target.set_codeTiers(tiers?.code);
            await target.set_libTiers(tiers?.libelle);
        } finally {
            target.mappings.fromModel = false;

        }
    }
    @boc.PropChange({
        constr: FactureDetailView,
        propName: ['codeTiers']
    })
    private static async codeTiersChanged(target: FactureDetailView, msg: boc.Message) {
        if (target.mappings.fromModel) return;
        const tiers = target.codeTiers ? await target.container.getOne<Tiers>(Tiers, { code: target.codeTiers }) : null;
        await target.model.set_tiers(tiers);
    }
}
