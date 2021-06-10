import * as boc from '@phoenix/boc';
import { Tiers } from '../../../../models/Tiers';
import { TiersDetailView } from '../../../../views/tiers/detail/TiersDetailView';

@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class TiersDetailViewRules {
    @boc.ObjectInit({
        constr: TiersDetailView,
    })
    private static async init(target: TiersDetailView, msg: boc.Message) {
        const c = target.container;
        const tiers = msg.data.code ? await c.getOne<Tiers>(Tiers, { code: msg.data.code }) :
            await c.createNew<Tiers>(Tiers);
        if (!tiers) {
            throw new boc.FatalError(c.t('Le tiers "{{0}}" n\'existe pas.', msg.data.code));
        }
        await target.set_model(tiers);
    }
}
