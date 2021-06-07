/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { SpoPreference } from '../../models/SpoPreference';
@boc.ClsInfo({
    title: 'PreferenceItemView',
    primaryKey: ['id'],
    modelConstr: SpoPreference,
    isTransient: true,
    mappingDef: [
        {
            from: '#model',
            mappings: [
                'libelle',
                'prive',
            ],
        },
    ],
    metadata: 'Accession',
})
export class PreferenceItemView extends boc.ViewModel<SpoPreference> {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Id.',
    })
    public get id(): number {
        return this.getProp('id');
    }
}
