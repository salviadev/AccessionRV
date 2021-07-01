import * as boc from '@phoenix/boc';
import { Article } from '../../../../models/Article';
import { Facture } from '../../../../models/Facture';
import { FactureDetail } from '../../../../models/FactureDetail';
import { Tiers } from '../../../../models/Tiers';
import { FactureDetailView } from '../../../../views/factures/detail/FactureDetailView';
import { FactureMntView } from '../../../../views/factures/detail/FactureMntView';
import { FactureTotalView } from '../../../../views/factures/detail/FactureTotalView';

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
                title: ACTIONS.add,
                saveAfter: false,
            }
        );
    }
    @boc.ObjectInit({
        constr: FactureDetailView,
    })
    private static async init(target: FactureDetailView, msg: boc.Message) {
        const c = target.container;
        target.lignes.listen('xxxx');
        await target.set_totalIsDirty(true);
        const total = await c.createNew<FactureTotalView>(FactureTotalView);
        await total.set_montant(0);
        await target.set_total(total);

        const facture = msg.data.code ? await c.getOne<Facture>(Facture, { code: msg.data.code }) :
            await c.createNew<Facture>(Facture);
        if (!facture) {
            throw new boc.FatalError(c.t('La facture "{{0}}" n\'existe pas.', msg.data.code));
        }
        await target.set_model(facture);
        const lignes = await facture.details.toArray();
        for (const ligne of lignes) {
            const viewLigne = await c.createNew<FactureMntView>(FactureMntView);
            await viewLigne.set_model(ligne);
            await target.lignes.link(viewLigne);
        }

    }

    @boc.Action({
        constr: FactureDetailView,
        actionId: ACTIONS.add,
    })
    private static async addLine(target: FactureDetailView, msg: boc.Message) {
        const c = target.container;
        const aaa = target.mappings.articles;
        if (target.model) {
            const item = await c.createNew<FactureDetail>(FactureDetail);
            await target.model.details.link(item);
            const viewLigne = await c.createNew<FactureMntView>(FactureMntView);
            await viewLigne.set_model(item);
            await target.lignes.link(viewLigne);
        }
    }

    @boc.Action({
        constr: FactureDetailView,
        actionId: ACTIONS.remove,
    })
    private static async removeLine(target: FactureDetailView, msg: boc.Message) {
        const c = target.container;
        if (msg.data && msg.data.length) {
            const ids = msg.data;
            const id = ids[0];
            const viewLigneSelected = c.getOneInMem<FactureMntView>(FactureMntView, { id });
            const model = viewLigneSelected.model;
            await target.lignes.unlink(viewLigneSelected);
            await model.toDelete();
            await viewLigneSelected.toDelete();
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
    /*
    @boc.BeforeGetData({
        constr: FactureDetailView,
        isGlobal: true,
    })
    private static async beforeGetData(target: FactureDetailView, msg: boc.Message) {
        if (target.totalIsDirty) {
            await target.set_totalIsDirty(false);
            const lignes = await target.model.details.toArray();
            const total = await target.total();
            let mnt = 0;
            for (const item of lignes) {
                mnt = mnt + item.montant;
            }
            await total.set_montant(mnt);
        }
    }
    */
    @boc.RoleChange({
        constr: FactureDetailView,
        propName: 'lignes'
    })
    private static async addRemoveLignes(target: FactureDetailView, msg: boc.Message) {
        const c = target.container;
        const total = await target.total();
        const ligne = c.getInMemByRef(msg.data.opposite) as FactureMntView;
        if (msg.kind === boc.MessageType.Link) {
            await total.set_montant(total.montant + ligne.model.montant);
        } else if (msg.kind === boc.MessageType.Unlink) {
            await total.set_montant(total.montant - ligne.model.montant);
        }
    }
    @boc.PropChange({
        constr: FactureDetailView,
        path: 'xxxx/#model',
        propName: 'montant'
    })
    private static async montantChanged(target: FactureDetailView, msg: boc.Message) {
        const total = await target.total();
        await total.set_montant(total.montant - msg.data.oldValue + msg.data.newValue);
        // await target.set_totalIsDirty(true);
    }

}
