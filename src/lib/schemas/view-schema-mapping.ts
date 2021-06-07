import * as boc from '@phoenix/boc';
// import { SpoChampExtRules } from '../rules/champs-ext/SpoChampExtRules';
export interface IFieldSchemaMapping {
    from: string;
    to: string;
}
export interface IChampExtInfo {
    propriete: string;
    categorie?: string;
    isStandard?: boolean;
    libelle: string;
    isObligatoire?: boolean;
}
export interface IFieldsSchemaMapping {
    from: string | boc.ModelObjectConstructor<boc.ModelObject>;
    mappings: Array<string | IFieldSchemaMapping>;
}
export interface IViewSchemaMapping {
    to?: string | boc.ModelObjectConstructor<boc.ModelObject>;
    mappings: IFieldsSchemaMapping[];
}
export interface IViewCustomFieldInfo {
    entite: string;
    srcProp: string;
    isStandard?: boolean;
    isObligatoire?: boolean;
    libelle: string;
    categorie?: string;
}

export interface IViewCustomFieldsInfos {
    [viewName: string]: {
        [propName: string]: IViewCustomFieldInfo;
    };
}
export class ViewSchemaMappings {
    public readonly mappings: Map<boc.ModelObjectConstructor<boc.ModelObject>, IViewSchemaMapping[]>;
    constructor() {
        this.mappings = new Map<boc.ModelObjectConstructor<boc.ModelObject>, IViewSchemaMapping[]>();
    }
    public register(viewConstr: boc.ModelObjectConstructor<boc.ModelObject>, mappings: IViewSchemaMapping[]) {
        let registeredMappings = this.mappings.get(viewConstr);
        if (!registeredMappings) {
            registeredMappings = [];
            this.mappings.set(viewConstr, registeredMappings);
        }
        registeredMappings.push(...mappings);
    }

    public async getCustomFields(c: boc.Container, viewConstr: boc.ModelObjectConstructor<boc.ModelObject>): Promise<IViewCustomFieldsInfos> {
        const mappings = this.mappings.get(viewConstr);
        if (!mappings) {
            return undefined;
        }
        const result: IViewCustomFieldsInfos = {};
        return result;
    }
    public async getSchemaOverrides(c: boc.Container, viewConstr: boc.ModelObjectConstructor<boc.ModelObject>, props?: string[]): Promise<any> {
        const infos = await this.getCustomFields(c, viewConstr);
        const viewNames = Object.getOwnPropertyNames(infos);
        const overrides: {
            [viewName: string]: {
                properties: {
                    [propName: string]: {
                        title?: string;
                        isMandatory?: boolean;
                        isHidden?: boolean;
                    }
                }
            }
        } = {};
        for (const viewName of viewNames) {
            const viewInfo = infos[viewName];
            const viewOverride: {
                properties: {
                    [propName: string]: {
                        title?: string;
                        isMandatory?: boolean;
                        isHidden?: boolean;
                    }
                }
            } = { properties: {} };

            let hasProps = false;
            for (const propName of Object.getOwnPropertyNames(viewInfo)) {
                if (props && props.indexOf(propName) < 0) continue;
                const propInfo = viewInfo[propName];
                const propOverride: {
                    title?: string;
                    isMandatory?: boolean;
                    isHidden?: boolean;
                } = {};
                if (propInfo.libelle) {
                    propOverride.title = propInfo.libelle;
                }
                propOverride.isMandatory = propInfo.isObligatoire || false;
                if (!propInfo.isStandard) {
                    propOverride.isHidden = false;
                }
                viewOverride.properties[propName] = propOverride;
                hasProps = true;
            }
            if (hasProps) {
                overrides[viewName] = viewOverride;
            }
        }
        return Object.getOwnPropertyNames(overrides).length ? overrides : null;
    }
}

export const viewSchemaMappings = new ViewSchemaMappings();