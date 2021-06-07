import * as boc from '@phoenix/boc';
import { PreferencesManagementView } from '../../views/preferences/PreferencesManagementView';
import { SpoRights } from '../spo/rights/spo-rights';
import { SpoPreference } from '../../models/SpoPreference';
import { PreferenceItemView } from '../../views/preferences/PreferenceItemView';

const REMOVE_PREF_ACTION = 'preferences.removePreference';
const SAVE_PREF_ACTION = 'savePreference';

@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession',
})
export class PreferencesManagementViewRulesRules {
    public static initMetadata(m: boc.ModelMetadata) {
        m.registerActions(PreferencesManagementView,
            {
                id: REMOVE_PREF_ACTION,
                title: 'Remove preference',
                saveAfter: false,
            },
            {
                id: SAVE_PREF_ACTION,
                title: 'Save preference',
                saveAfter: false,
            }

        );
    }
    @boc.ObjectInit({
        constr: PreferencesManagementView,
    })
    private static async init(target: PreferencesManagementView, msg: boc.Message) {
        const container = target.container;
        if (!msg.data || !msg.data.classe) {
            throw new Error(container.t('La classe des preferences est vide.'));
        }
        const user = await SpoRights.userId(container);
        const preferences = await container.getMany<SpoPreference>(SpoPreference, {
            $and: [
                { classe: msg.data.classe },
                {
                    $or: [
                        {
                            $and: [
                                { util: user },
                                { prive: true },
                            ]
                        },
                        {
                            prive: false
                        }
                    ]
                }
            ]
        });
        for (const preference of preferences) {
            const view = await preference.createViewModel<PreferenceItemView>(PreferenceItemView);
            await target.preferences.link(view);
        }
    }
    @boc.Action({
        constr: PreferencesManagementView,
        actionId: SAVE_PREF_ACTION,
    })
    private static async savePrefs(target: PreferencesManagementView, msg: boc.Message) {
        await target.container.save();
    }
    @boc.Action({
        constr: PreferencesManagementView,
        actionId: REMOVE_PREF_ACTION,
    })
    private static async removePrefs(target: PreferencesManagementView, msg: boc.Message) {
        const ids = msg.data;
        const models = await target.preferences.toArray();
        if (!Array.isArray(ids)) {
            return;
        }
        const views = ids.map((id) => models.find((a) => a.id === id)).filter((a) => a);
        for (const view of views) {
            await target.preferences.unlink(view);
            await view.model.toDelete();
            await view.toDelete();
        }
    }
}