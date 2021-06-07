import * as boc from '@phoenix/boc';
import { SpoRights } from '../spo/rights/spo-rights';
import { SpoPreference } from '../../models/SpoPreference';
import { PreferenceView } from '../../views/preferences/PreferenceView';

export class PreferencesHelper {
    public static USER_PREFERENCES = 'GLOBAL_PREFS';
    public static userPreferences(container: boc.Container): Promise<any> {
        return this.preferencesPayloadByClasse(container,  this.USER_PREFERENCES, true);
    }
    public static saveUserPreferences(container: boc.Container, userPrefs: any) {
        return this.savePreferences(container, userPrefs, this.USER_PREFERENCES, true, container.t('Préférences utilisateur'));
    }
    public static async getObject(container: boc.Container, classe: string, prive: boolean, userId?: string): Promise<SpoPreference> {
        userId = userId || (prive ? await SpoRights.userId(container) : null);
        const filter = await this.getFilter(container, classe, prive, userId);
        const prefs = await container.getOne<SpoPreference>(SpoPreference, filter);
        return prefs;
    }

    public static async savePreferences(container: boc.Container, userPrefs: any, classe: string, prive: boolean, libelle: string) {
        const userId = prive ? await SpoRights.userId(container) : null;
        userPrefs = userPrefs || {};
        let result: boolean = false;
        await container.usingNewContainer(async (c: boc.Container) => {
            try {
                let prefs = await this.getObject(c, classe, prive, userId);
                if (!prefs) {
                    prefs = await c.createNew<SpoPreference>(SpoPreference);
                    await prefs.set_classe(classe);
                    await prefs.set_util(userId);
                }
                await prefs.set_valeur(JSON.stringify(userPrefs));
                if (prefs.objectState === boc.ObjectState.New || !prefs.libelle) {
                    await prefs.set_libelle(libelle);
                }
                await c.save();
                result = c.lastSaveWasOK;
            } catch (e) {
                result = false;
            }
        });
        return result;
    }

    public static getPrefByPath(userPreferences: any, path: string): any {
        userPreferences = userPreferences || {};
        const segments = path.split('.');
        const lastSegment = segments.pop();
        let parent = userPreferences;
        for (const segment of segments) {
            parent = parent[segment];
            if (!parent) {
                return undefined;
            }
        }
        return parent[lastSegment];
    }
    public static setPrefByPath(userPreferences: any, path: string, value: any) {
        userPreferences = userPreferences || {};
        const segments = path.split('.');
        const lastSegment = segments.pop();
        let parent = userPreferences;
        for (const segment of segments) {
            const p = parent[segment];
            if (!p) {
                parent[segment] = {};
                parent = parent[segment];
            } else {
                parent = parent[segment];
            }
        }
        parent[lastSegment] = value;
    }
    public static async loadPreferences(container: boc.Container, classe: string, addDefault: boolean, defaultTitle?: string): Promise<PreferenceView[]> {
        const res: PreferenceView[] = [];
        const user = await SpoRights.userId(container);
        if (addDefault) {
            const defPref = await container.createNew<PreferenceView>(PreferenceView);
            await defPref.set_code('');
            await defPref.set_libelle(defaultTitle || container.t('Défaut'));
            await defPref.set_prive(true);
            await defPref.set_vide(true);
            res.push(defPref);
        }
        try {
            const preferences = await container.getData(SpoPreference, {
                select: ['code', 'libelle', 'prive'],
                filter: {
                    $and: [
                        { classe },
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
                },
                sort: ['libelle']
            });
            for (const preference of preferences.value) {
                const pref = await container.createNew<PreferenceView>(PreferenceView);
                await pref.set_code(preference.code);
                await pref.set_libelle(preference.libelle);
                await pref.set_prive(preference.prive);
                await pref.set_vide(false);
                res.push(pref);
            }
        } catch (e) {
            return res;
        }
        return res;
    }
    public static async preferencesPayload(container: boc.Container, code: string): Promise<any> {
        if (!code) return {};
        const filter = { code };
        return this.getPayload(container, filter);
    }

    public static async preferencesPayloadByClasse(container: boc.Container, classe: string, prive: boolean): Promise<any> {
        if (!classe) {
            return {};
        }
        const filter = await this.getFilter(container, classe, prive);
        return this.getPayload(container, filter);
    }

    private static async getFilter(container: boc.Container, classe: string, prive: boolean, userId?: string) {
        const filter: any = { classe, prive };
        if (prive) {
            filter.util = userId || await SpoRights.userId(container);
        }
        return filter;
    }
    private static async getPayload(container: boc.Container, filter: any): Promise<any> {
        const preferences = await container.getData(SpoPreference, {
            select: ['valeur'],
            filter,
        });
        if (preferences.value.length && preferences.value[0].valeur) {
            try {
                return JSON.parse(preferences.value[0].valeur) || {};
            } catch (e) {
                return {};
            }
        }
        return {};
    }
}
