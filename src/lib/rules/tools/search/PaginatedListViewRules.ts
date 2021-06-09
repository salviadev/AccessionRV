import * as boc from '@phoenix/boc';
import { PaginatedListView } from '../../../views/tools/PaginatedListView';
import { ListViewTools } from './list-view';

export const ACTIONS_PAGINATED_LIST = {
    MANAGE_MODELS: 'models.manageModels',
    SAVE_MODELS: 'models.saveModel',
    REFRESH_MODELS: 'models.refreshModels',
    SAVE_SELECTED: 'saveSelected',
};
@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession',
})
class PaginatedListViewRules {
    public static initMetadata(m: boc.ModelMetadata) {
        m.registerActions(PaginatedListView,
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
            {
                id: ACTIONS_PAGINATED_LIST.MANAGE_MODELS,
                title: ACTIONS_PAGINATED_LIST.MANAGE_MODELS,
                saveAfter: false,
            },
            {
                id: ACTIONS_PAGINATED_LIST.SAVE_SELECTED,
                title: ACTIONS_PAGINATED_LIST.SAVE_SELECTED,
                saveAfter: false,
            }
        );
    }
    @boc.Action({
        constr: PaginatedListView,
        actionId: ACTIONS_PAGINATED_LIST.SAVE_MODELS
    })
    private static async saveModel(target: PaginatedListView, msg: boc.Message) {
        await ListViewTools.saveModel(target, msg);
    }
    @boc.Action({
        constr: PaginatedListView,
        actionId: ACTIONS_PAGINATED_LIST.REFRESH_MODELS,
    })
    private static async refreshModels(target: PaginatedListView, msg: boc.Message) {
        await ListViewTools.refreshModels(target, msg);
    }
    @boc.Action({
        constr: PaginatedListView,
        actionId: ACTIONS_PAGINATED_LIST.SAVE_SELECTED,
    })
    private static async saveSelected(target: PaginatedListView, msg: boc.Message) {
        await ListViewTools.saveSelected(target, msg);
    }
    @boc.Action({
        constr: PaginatedListView,
        actionId: PaginatedListView.$method.getList,
    })
    private static async getList(target: PaginatedListView, msg: boc.Message): Promise<boc.FindRelation<boc.BaseViewModel, boc.BaseViewModel>> {
        return (target as any)[target.listPropName];
    }
}
