/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { TiersItemView } from './TiersItemView';
@boc.ClsInfo({
    title: 'TiersView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'tiers',
    ],
    metadata: 'Accession',
})
export class TiersView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation tiers
            {
                constr: boc.FindRelation,
                settings: {
                    roleProp: 'tiers',
                    oppositeConstr: TiersItemView,
                    instanceOptions: true,
                    findClass: 'Tiers',
                    findOptions: {
                        select: [
                            'code',
                            'libelle',
                        ],
                        count: true,
                        optimizeCount: true,
                        limit: 20,
                        sort: [
                            'libelle',
                        ],
                    },
                }
            },
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

    // relation tiers
    public tiers: boc.FindRelation<TiersView, TiersItemView>;
}
