import * as boc from '@phoenix/boc';
import { Utils } from '../../../tools/utils';
import { FactureDetail } from '../../../models/FactureDetail';

@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class FactureDetailRules {
    @boc.ObjectInit({
        constr: FactureDetail,
    })
    private static async init(target: FactureDetail, msg: boc.Message) {
        if (target.objectState === boc.ObjectState.New) {
            if (!target.data.code) {
                target.data.code = 'FM' + Utils.formatId(target.id, 8);
            }
            target.data.montant = target.data.montant || 0;
        }
    }
}
