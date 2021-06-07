import * as boc from '@phoenix/boc';
import { PreferenceSaveView } from '../../views/preferences/PreferenceSaveView';
import { PreferencesHelper } from './spo-preferences';
import { SpoPreference } from '../../models/SpoPreference';
import { SpoRights } from '../spo/rights/spo-rights';

@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession',
})
export class SpoPreferenceSaveViewRules {
    public static initMetadata(m: boc.ModelMetadata) {
        m.registerActions(PreferenceSaveView,
            {
                id: 'saveModel',
                description: 'Create or modificate model',
                title: 'Create or modificate model',
                saveAfter: false,
            });
    }
    @boc.Action({
        constr: PreferenceSaveView,
        actionId: 'saveModel',
    })
    private static async saveModel(target: PreferenceSaveView, msg: boc.Message): Promise<void> {
        let toSave: SpoPreference = null;
        const container = target.container;
        if (target.modeCreate && !target.libelle) {
            throw new Error(container.t('La libelle de modéle est vide.'));
        }
        if (!target.classe) {
            throw new Error(container.t('La classe de modéle est vide.'));
        }
        const userId = await SpoRights.userId(container);
        if (target.modeCreate) {
            toSave = await container.createNew<SpoPreference>(SpoPreference);
            await toSave.set_libelle(target.libelle);
            await toSave.set_classe(target.classe);
            await toSave.set_prive(target.prive);
            await toSave.set_util(userId);
            await toSave.set_valeur(target.valeur);
            try {
                const saveResult = await container.save();
                const errors = boc.BocTools.thrownErrors(saveResult);
                if (errors && errors.length) {
                    await toSave.toDelete();
                } else {
                    await target.set_codeModel(toSave.code);
                }
            } catch (e) {
                await toSave.toDelete();
                throw e;
            }
        } else {
            toSave = await container.getOne<SpoPreference>(SpoPreference, { code: target.codeModel });
            await toSave.set_valeur(target.valeur);
            await container.save();
        }
    }
    @boc.ObjectInit({
        constr: PreferenceSaveView,
    })
    private static async init(target: PreferenceSaveView, msg: boc.Message) {
        if (msg && msg.data.valeur) {
            if (typeof msg.data.valeur === 'object') {
                msg.data.valeur = JSON.stringify(msg.data.valeur);
            }
            await target.set_valeur(msg.data.valeur);
        }
        if (msg && msg.data.defaultModel) {
            await target.set_codeModel(msg.data.defaultModel);
        }
        if (msg && msg.data.classe) {
            await target.set_classe(msg.data.classe);
        }
        await target.set_prive(true);
        await target.set_modeCreate(true);
        const preferences = await PreferencesHelper.loadPreferences(target.container, target.classe, false);
        for (const preference of preferences) {
            if (target.codeModel && preference.code === target.codeModel) {
                await target.set_modeCreate(false);
            }
            await target.models.link(preference);
        }
        if (!target.codeModel && preferences.length) {
            await target.set_codeModel(preferences[0].code);
        }
        await target.propState.modeCreate.set_isDisabled(!preferences.length);
    }
    @boc.PropChange({
        constr: PreferenceSaveView,
        propName: ['modeCreate'],
    })
    private static async newModelChanged(target: PreferenceSaveView, msg: boc.Message) {
        await target.propState.libelle.set_isHidden(!target.modeCreate);
        await target.propState.codeModel.set_isHidden(target.modeCreate);
    }

}