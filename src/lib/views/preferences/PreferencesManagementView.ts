/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { PreferenceItemView } from './PreferenceItemView';
@boc.ClsInfo({
    title: 'PreferencesManagementView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'preferences',
    ],
    metadata: 'Accession',
})
export class PreferencesManagementView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation preferences
            {
                constr: boc.TransientMany,
                settings: {
                    roleProp: 'preferences',
                    oppositeConstr: PreferenceItemView,
                }
            },
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property classe
    @boc.PropertyInfo({
        type: 'string',
    })
    public get classe(): string {
        return this.getProp('classe');
    }

    public set_classe(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('classe', value);
    }

    // relation preferences
    public preferences: boc.TransientMany<PreferencesManagementView, PreferenceItemView>;
}
