import * as boc from '@phoenix/boc';
import { GedFichier } from '../../models/GedFichier';
import { Utils } from '../../tools/utils';
export class GedFichierRules {
    @boc.ObjectInit({
        constr: GedFichier,
        isNew: true,
    })
    private static async beforeSave(target: GedFichier, msg: boc.Message) {
        if (!target.data.code) {
            target.data.code = Utils.uuid22();
        }
    }
}