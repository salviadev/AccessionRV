import * as boc from '@phoenix/boc';
import { Article } from '../../../../models/Article';
import { ArticleDetailView, ArticleDetailViewTabs, ArticleDetailViewTabsTrad } from '../../../../views/article/detail/ArticleDetailView';

@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class ArticleDatailViewRules {
    @boc.ObjectInit({
        constr: ArticleDetailView,
    })
    private static async init(target: ArticleDetailView, msg: boc.Message) {
        const c = target.container;
        const article = msg.data.code ? await c.getOne<Article>(Article, { code: msg.data.code }) :
            await c.createNew<Article>(Article);
        if (!article) {
            throw new boc.FatalError(c.t('L\'article "{{0}}" n\'existe pas.', msg.data.code));
        }
        await target.set_model(article);
        await target.set_tabs(ArticleDetailViewTabs.I);
        await this.initSchema(target);
    }

    private static async initSchema(target: ArticleDetailView) {
        const c = target.container;
        target.$schema = target.$schema || {};
        target.$schema.ArticleDetailView = target.$schema.ArticleDetailView || {};
        const props = target.$schema.ArticleDetailView.properties = target.$schema.ArticleDetailView.properties || {};
        // Init tabs enums
        props.tabs = props.tabs || {};
        props.tabs.enum = props.tabs.enum || [];
        props.tabs.enumNames = props.tabs.enumNames || [];
        const obj: any = ArticleDetailViewTabs;
        const enumValues = Object.keys(obj);
        for (const key of enumValues) {
            const enumValue = obj[key];
            props.tabs.enum.push(enumValue);
            props.tabs.enumNames.push(ArticleDetailViewTabsTrad.getLibelle(enumValue, c));
        }
    }
}
