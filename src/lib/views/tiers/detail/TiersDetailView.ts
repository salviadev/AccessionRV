/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { Tiers } from '../../../models/Tiers';
@boc.ClsInfo({
    title: 'TiersDetailView',
    primaryKey: ['id'],
    modelConstr: Tiers,
    isTransient: true,
    mappingDef: [
        {
            from: '#model',
            mappings: [
                'code',
                'libelle',
            ],
        },
    ],
    metadata: 'Accession',
})
export class TiersDetailView extends boc.ViewModel<Tiers> {
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
