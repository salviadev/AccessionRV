import * as boc from '@phoenix/boc';
import { Article } from '../../../../models/Article';
import { Utils } from '../../../../tools/utils';
import { ArticlesItemView } from '../../../../views/article/list/ArticlesItemView';
import { ArticlesTotalView } from '../../../../views/article/list/ArticlesTotalView';
import { ArticlesView } from '../../../../views/article/list/ArticlesView';

const ACTIONS = {
    remove: 'articles.remove',
};
@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class ArticlesViewRules {

    public static initMetadata(m: boc.ModelMetadata) {
        m.registerActions(ArticlesView,
            {
                id: ACTIONS.remove,
                title: ACTIONS.remove,
                saveAfter: false,
            }
        );
    }
    @boc.ObjectInit({
        constr: ArticlesView,
    })
    private static async init(target: ArticlesView, msg: boc.Message) {
        const c = target.container;
        const total = await c.createNew<ArticlesTotalView>(ArticlesTotalView, null, null, false, { prix: 0 });
        await target.set_total(total);
        await this.calculateTotal(target);
    }
    @boc.Action({
        constr: ArticlesView,
        actionId: ACTIONS.remove,
    })
    private static async removeArticle(target: ArticlesView, msg: boc.Message) {
        let error = null;
        if (msg.data && msg.data.length) {
            const id: number = msg.data[0];
            const articleView = target.container.getOneInMem<ArticlesItemView>(ArticlesItemView, { id });
            if (!articleView) return;
            await target.container.usingNewContainer(async (c) => {
                try {
                    const article = await c.getOne<Article>(Article, { code: articleView.code });
                    if (!article)
                        throw new boc.BOErr(c.t('L\'article "{{0}}" n\'existe pas', articleView.libelle));
                    await article.toDelete();
                    const saveResult = await c.save();
                    Utils.checkAfterSave(c, saveResult);
                } catch (e) {
                    error = e;
                }
            });
            if (error)
                throw error;
            await target.articles.load();
            await this.calculateTotal(target);
        }
    }
    private static async calculateTotal(target: ArticlesView) {
        const c = target.container;
        const total = await target.total();
        await total.set_prix(0);
        const data = await c.getDataObjects<{ prix: number }>(Article, {
            select: ['$sum(prix) prix'],
        });
        if (data.length) {
            await total.set_prix(data[0].prix);
        }
    }
}