import * as boc from '@phoenix/boc';
import { Article } from '../../../models/Article';
import { Utils } from '../../../tools/utils';

@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class ArticleRules {
    @boc.ObjectInit({
        constr: Article,
    })
    private static async init(target: Article, msg: boc.Message) {
        if (target.objectState === boc.ObjectState.New) {
            if (!target.data.code) {
                target.data.code = 'A' + Utils.formatId(target.id, 8);
            }
            target.data.prix = target.data.prix || 0;
        }
    }
    @boc.Deleting({
        constr: Article,
    })
    private static async beforeRemove(target: Article, msg: boc.Message) {
        const c = target.container;
        // verifier si l'article peut etre supprimé
        await Utils.checkCanRemoveObject(target, []);
        try {
            await Utils.checkCanRemoveObject(target, []);
        } catch (e) {
            throw new boc.BOErr(c.t('L\'article est utilisé.'));
        }
        // ....
    }
    @boc.BeforeSave({
        constr: Article,
    })
    private static async beforeSave(target: Article, msg: boc.Message) {
        if (target.isDeleted) {
            return;
        }
        await this.checkArticle(target);
    }
    @boc.PropChanging({
        constr: Article,
        propName: 'prix'
    })
    private static async beforePrixChanged(target: Article, msg: boc.Message) {
        msg.data.accept = true;
        msg.data.newValue = Math.max(msg.data.newValue, 0);
    }
    private static async checkArticle(target: Article) {
        const c = target.container;
        if (!target.libelle)
            throw new boc.BOErr(c.t('Le libellé doit être indiqué.'));
    }

}
