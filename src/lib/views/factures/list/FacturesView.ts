/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { FactureItemView } from './FactureItemView';
@boc.ClsInfo({
    title: 'FacturesView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'factures',
    ],
    metadata: 'Accession',
})
export class FacturesView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation factures
            {
                constr: boc.FindRelation,
                settings: {
                    roleProp: 'factures',
                    oppositeConstr: FactureItemView,
                    instanceOptions: true,
                    findClass: 'Facture',
                    findOptions: {
                        entities: {
                            detail: {
                                entityName: 'FactureDetail',
                                select: [
                                    '$sum(montant) montant',
                                    'parentId',
                                ],
                                groupBy: [
                                    'parentId',
                                ],
                            },
                        },
                        select: [
                            'code',
                            'libelle',
                            'detail.montant montant',
                        ],
                        join: [
                            {
                                entity: 'detail',
                                type: 'left',
                                condition: {
                                    id: 'parentId',
                                },
                            },
                        ],
                        count: true,
                        optimizeCount: true,
                        limit: 20,
                        sort: [
                            'id desc',
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

    // relation factures
    public factures: boc.FindRelation<FacturesView, FactureItemView>;
}
