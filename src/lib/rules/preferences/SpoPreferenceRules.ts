import * as boc from '@phoenix/boc';
import { Utils } from '../../tools/utils';
import { SpoPreference } from '../../models/SpoPreference';

@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession',
})
export class SpoPreferenceRules {
    @boc.ObjectInit({
        constr: SpoPreference,
        isNew: true
    })
    private static async init(target: SpoPreference, msg: boc.Message) {
        if (!target.code) {
            await target.set_code('PRF' + Utils.formatId(target.id, 8));
        }
    }
    @boc.PropChange({
        constr: SpoPreference,
        propName: 'util',
    })
    private static async setPrive(target: SpoPreference, msg: boc.Message) {
        await target.set_prive(target.util ? true : false);
    }

}