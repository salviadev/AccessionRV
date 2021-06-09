import * as boc from '@phoenix/boc';
import { PaginatedListView } from '../../../views/tools/PaginatedListView';
import { PreferencesHelper } from '../../preferences/spo-preferences';
export interface IViewList extends PaginatedListView {
    getList(data?: any): Promise<boc.FindRelation<boc.BaseViewModel, boc.BaseViewModel>>;
}

export class ListViewTools {
    public static async loadModels(target: IViewList) {
        const preferences = await PreferencesHelper.loadPreferences(target.container, target.classePref, true, target.container.t('Choisir un modèle'));
        for (const preference of preferences) {
            await target.models.link(preference);
        }
        await target.set_modelCode(await ListViewTools.loadCurrentModel(target));
    }
    public static async saveModel(target: IViewList, msg: boc.Message) {
        let payload = await PreferencesHelper.preferencesPayloadByClasse(target.container, target.classePref, true);
        payload = payload || {};
        payload.columns = (msg.data && msg.data.columns) ? msg.data.columns : null;
        await PreferencesHelper.savePreferences(target.container, payload, target.classePref, true, target.classePref);
    }

    public static async modelCodeChanged(target: IViewList) {
        const models = await target.models.toArray();
        let modelFound = false;
        const cm = target.modelCode || '';
        for (const model of models) {
            const modelCode = model.code || '';
            if (modelCode === cm) {
                modelFound = true;
                await target.set_modelTitle(model.libelle);
            }
        }
        if (!modelFound) {
            await target.set_modelCode('');
        }
        if (modelFound) {
            await this.applyModel(target);
            if (!target.mappings.inInitialization) {
                const userPrefs = await PreferencesHelper.userPreferences(target.container);
                PreferencesHelper.setPrefByPath(userPrefs, target.lastModelPath, cm);
                await PreferencesHelper.saveUserPreferences(target.container, userPrefs);
            }
        }
    }
    public static async userFilter(target: IViewList): Promise<any> {
        let userFilter: any = null;
        if (target.userLastFilterCode) {
            const userPrefs = await PreferencesHelper.preferencesPayloadByClasse(target.container, target.userLastFilterCode, true);
            userFilter = PreferencesHelper.getPrefByPath(userPrefs, 'filter') || null;
        }
        return userFilter;
    }
    public static async saveUserFilter(target: IViewList): Promise<any> {
        if (target.userLastFilterCode) {
            const list = await target.getList();
            const userPrefs = await PreferencesHelper.preferencesPayloadByClasse(target.container, target.userLastFilterCode, true);
            const filter = list.filter ? JSON.parse(list.filter) : null;
            PreferencesHelper.setPrefByPath(userPrefs, 'filter', filter);
            await PreferencesHelper.savePreferences(target.container, userPrefs, target.userLastFilterCode, true, target.userLastFilterCode);
        }
    }
    public static async beforeGetData(target: boc.BaseViewModel, cb: (lastSelectedCode: string) => Promise<void>) {
        if (target.mappings.doRefresh) {
            target.mappings.doRefresh = false;
            await cb(target.mappings.lastSelected);
            target.mappings.lastSelected = null;
        }
        if (target.mappings.doRefreshOnBack) {
            target.mappings.doRefreshOnBack = false;
            target.mappings.doRefresh = true;
        }
    }
    public static async saveSelected(target: boc.BaseViewModel, msg: boc.Message) {
        target.mappings.doRefreshOnBack = true;
        target.mappings.doRefresh = false;
        if (msg.data.code) {
            target.mappings.lastSelected = msg.data.code;
        }
    }
    public static async refreshModels(target: IViewList, msg: boc.Message) {
        const oldModels = await target.models.toArray();
        for (const model of oldModels) {
            await target.models.unlink(model);
            await model.toDelete();
        }
        await this.loadModels(target);
        if (msg && msg.data && msg.data.model) {
            await target.set_modelCode(msg.data.model);
        }
        await this.checkCodeModel(target);
    }
    public static async refresh(target: IViewList, pageSize?: number, code?: string) {
        const list = await target.getList();
        if (list.pageNumber > 1) {
            if (pageSize && list.pageSize !== pageSize) {
                await list.set_pageSize(pageSize);
            } else {
                await list.set_pageNumber(list.pageNumber);
                await list.load();
            }
        } else {
            if (pageSize && list.pageSize !== pageSize) {
                await list.set_pageSize(pageSize);
            } else
                await list.load();
        }
        await this.selectFirstLine(target, code);
    }
    public static async selectFirstLine(target: IViewList, code?: string) {
        const list = await target.getList();
        const ops = await list.toArray();
        if (ops.length) {
            let index = 0;
            if (code) {
                index = ops.findIndex((ii: any) => ii.code === code);
                if (index < 0) index = 0;
            }
            await list.set_selectedItems(ops.length ? [ops[index]] : []);
        }
    }

    private static async checkCodeModel(target: IViewList) {
        if (target.modelCode) {
            const models = await target.models.toArray();
            for (const model of models) {
                if (model.code === target.modelCode) {
                    return;
                }
            }
            await target.set_modelCode('');
        }
    }
    private static async applyModel(target: IViewList) {
        const list = await target.getList();
        if (!target.modelCode) {
            await list.set_columns(null);
            return;
        }
        const payload = await PreferencesHelper.preferencesPayload(target.container, target.modelCode);
        if (payload && payload.columns) {
            await list.set_columns(JSON.stringify(payload.columns));
        } else {
            await list.set_columns(null);
        }
    }
    private static async loadCurrentModel(target: IViewList): Promise<string> {
        const preferences = await PreferencesHelper.userPreferences(target.container);
        return PreferencesHelper.getPrefByPath(preferences, target.lastModelPath) || '';
    }

}
