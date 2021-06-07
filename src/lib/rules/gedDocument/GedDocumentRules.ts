import * as boc from '@phoenix/boc';
import { GedDocument } from '../../models/GedDocument';

export class GedDocumentRules {
    @boc.BeforeSave({
        constr: GedDocument,
    })
    private static async beforeSave(target: GedDocument, msg: boc.Message) {
        if (target.isDeleted) return;
        if (!target.dateCreation)
            await target.set_dateCreation(boc.DateTime.now());
        await target.set_dateModif(boc.DateTime.now());
    }
}