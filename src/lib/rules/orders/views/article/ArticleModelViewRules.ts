import * as boc from '@phoenix/boc';
import { clone, normalizeFilter } from '@phoenix/schema';
import { FindOptions } from '@phoenix/boc-interfaces';
import { Article } from '../../../../models/Article';
import { Utils } from '../../../../tools/utils';
import { ArticlesItemModelView } from '../../../../views/article/list-with-model/ArticlesItemModelView';
import { ArticlesModelTotalView } from '../../../../views/article/list-with-model/ArticlesModelTotalView';
import { ArticlesModelView } from '../../../../views/article/list-with-model/ArticlesModelView';
import { ListViewTools } from '../../../tools/search/list-view';
import { ACTIONS_PAGINATED_LIST } from '../../../tools/search/PaginatedListViewRules';

const
    ARTICLES_FILTER = 'articles-filter';
const
    ARTICLES_PREFERENCES = 'articles-model';
const
    ARTICLES_MODEL = 'articles.model';
const ACTIONS = {
    remove: 'articles.remove',
    search: 'search',
    clearSearch: 'clearSearch',
    refresh: 'articles.refresh',
};
@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class ArticlesModelViewRules {

    public static initMetadata(m: boc.ModelMetadata) {
        m.registerActions(ArticlesModelView,
            // Remove article
            {
                id: ACTIONS.remove,
                title: ACTIONS.remove,
                saveAfter: false,
            },
            // clear search text
            {
                id: ACTIONS.clearSearch,
                title: ACTIONS.clearSearch,
                saveAfter: false,
            },
            // search
            {
                id: ACTIONS.search,
                title: ACTIONS.search,
                saveAfter: false,
            },
            // Register parent Actions
            {
                id: ACTIONS_PAGINATED_LIST.SAVE_SELECTED,
                title: ACTIONS_PAGINATED_LIST.SAVE_SELECTED,
                saveAfter: false,
            },
            {
                id: ACTIONS_PAGINATED_LIST.SAVE_MODELS,
                title: ACTIONS_PAGINATED_LIST.SAVE_MODELS,
                saveAfter: false,
            },
            {
                id: ACTIONS_PAGINATED_LIST.REFRESH_MODELS,
                title: ACTIONS_PAGINATED_LIST.REFRESH_MODELS,
                saveAfter: false,
            },
        );
    }
    @boc.ObjectInit({
        constr: ArticlesModelView,
    })
    private static async init(target: ArticlesModelView, msg: boc.Message) {
        const c = target.container;
        // Init parent
        await target.set_classePref(ARTICLES_PREFERENCES);
        await target.set_userLastFilterCode(ARTICLES_FILTER);
        await target.set_lastModelPath(ARTICLES_MODEL);
        await target.set_listPropName('articles');
        // Create Total
        const total = await c.createNew<ArticlesModelTotalView>(ArticlesModelTotalView, null, null, false, { prix: 0 });
        await target.set_total(total);
        target.mappings.inInitialization = true;
        try {
            // Recuperer le filtre sauvegardé
            const userFilter = await ListViewTools.userFilter(target);
            // Charger la liste des modeles
            await ListViewTools.loadModels(target);
            const filter = await this.addFilter(target);
            if (userFilter) {
                await target.articles.set_filter(userFilter);
            }
            await this.searchChanged(target, null);
            // await this.loadDocuments(target);
            await ListViewTools.selectFirstLine(target);
            await this.calculateTotal(target, filter);
        } finally {
            target.mappings.inInitialization = false;
        }
    }
    @boc.PropChange({
        constr: ArticlesModelView,
        propName: ['searchText'],
    })
    private static async searchChanged(target: ArticlesModelView, msg: boc.Message) {
        const states = target.actionsStates.getState(ACTIONS.clearSearch);
        await states.set_isDisabled(!target.searchText);
        await target.set_search(target.searchText);
    }
    @boc.Action({
        constr: ArticlesModelView,
        actionId: ACTIONS.search
    })
    private static async doSearch(target: ArticlesModelView, msg: boc.Message) {
        await target.set_searchText(msg.data);
        await this.refresh(target);
        // await this.loadDocuments(target);
    }
    @boc.Action({
        constr: ArticlesModelView,
        actionId: ACTIONS.remove,
    })
    private static async removeArticle(target: ArticlesModelView, msg: boc.Message) {
        let error = null;
        if (msg.data && msg.data.length) {
            const id: number = msg.data[0];
            const articleView = target.container.getOneInMem<ArticlesItemModelView>(ArticlesItemModelView, { id });
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
            await this.refresh(target);
            // await this.loadDocuments(target);
        }
    }
    private static async refresh(target: ArticlesModelView, pageSize?: number, code?: string) {
        const filter = await this.addFilter(target);
        await ListViewTools.refresh(target, pageSize, code);
        await this.calculateTotal(target, filter);
    }
    private static async addFilter(target: ArticlesModelView, calculate?: boolean): Promise<any> {
        let filter: any = {
            $and: [],
        };
        const settings: FindOptions = target.articles.settings.findOptions;
        if (target.searchText) {
            if (target.searchText) {
                const cf = this.createSearchFilter(target);
                if (cf)
                    filter.$and.push(cf);
            }
        }
        if (!filter.$and.length)
            filter = {};
        if (!calculate)
            settings.filter = filter;
        return clone(filter);
    }
    private static createSearchFilter(target: ArticlesModelView): any {
        const cf: any = { $or: [] };
        if (target.searchText) {
            cf.$or.push({ libelle: { $regex: target.searchText } });
            cf.$or.push({ code: { $regex: target.searchText } });
            return cf;
        }
        return null;
    }
    private static async calculateTotal(target: ArticlesModelView, filter: any) {
        const c = target.container;
        const total = await target.total();
        await total.set_prix(0);
        const data = await c.getDataObjects<{ prix: number }>(Article, {
            select: ['$sum(prix) prix'],
            filter,
        });
        if (data.length) {
            await total.set_prix(data[0].prix);
        }
    }

    @boc.StateChanging({
        constr: ArticlesModelView,
        propName: 'articles',
        stateName: 'filter',
    })
    private static async filterChanging(target: ArticlesModelView, msg: boc.Message) {
        msg.data.accept = true;
        const nv: string = msg.data.newValue;
        if (nv) {
            const filter = JSON.parse(nv);
            target.articles.serverFilter = filter.$and ? JSON.stringify(filter) : null;
        } else
            target.articles.serverFilter = null;
    }
    @boc.StateChange({
        constr: ArticlesModelView,
        propName: 'commandes',
        stateName: 'pageNumber',
    })
    private static async onPageChange(target: ArticlesModelView, msg: boc.Message) {
        if (!target.mappings.inInitialization) {
            // await this.loadDocuments(target);
            await ListViewTools.selectFirstLine(target);
        }
    }
    @boc.Action({
        constr: ArticlesModelView,
        actionId: ACTIONS.refresh
    })
    private static async refreshArticles(target: ArticlesModelView, msg: boc.Message) {
        await this.refresh(target);
        // await this.loadDocuments(target);
    }
    @boc.Action({
        constr: ArticlesModelView,
        actionId: ACTIONS.clearSearch,
    })
    private static async clearSearch(target: ArticlesModelView, msg: boc.Message) {
        await target.set_searchText(null);
        await this.refresh(target, null);
        // await this.loadDocuments(target);
    }
    @boc.BeforeGetData({
        constr: ArticlesModelView,
        isGlobal: true,
    })
    private static async beforeGetData(target: ArticlesModelView, msg: boc.Message) {
        await ListViewTools.beforeGetData(target, async (lastSelectedCode) => {
            await this.refresh(target, 0, lastSelectedCode);
            // await this.loadDocuments(target);
        });
    }
    @boc.PropChange({
        constr: ArticlesModelView,
        propName: ['modelCode'],
    })
    private static async modelCodeChanged(target: ArticlesModelView, msg: boc.Message) {
        await ListViewTools.modelCodeChanged(target);
    }
    @boc.StateChange({
        constr: ArticlesModelView,
        propName: 'articles',
        stateName: 'filter',
    })
    private static async filterChanged(target: ArticlesModelView, msg: boc.Message) {
        if (target.mappings.inInitialization) return;
        await ListViewTools.saveUserFilter(target);
    }
}