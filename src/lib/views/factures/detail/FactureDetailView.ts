/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { Facture } from '../../../models/Facture';
import { FactureMntView } from './FactureMntView';
@boc.ClsInfo({
    title: 'FactureDetailView',
    primaryKey: ['id'],
    modelConstr: Facture,
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
    serializeDirectives: [
        'lignes',
    ],
    metadata: 'Accession',
})
export class FactureDetailView extends boc.ViewModel<Facture> {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation lignes
            {
                constr: boc.TransientMany,
                settings: {
                    roleProp: 'lignes',
                    oppositeConstr: FactureMntView,
                    syncSource: 'details',
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

    // read write property codeTiers
    @boc.PropertyInfo({
        type: 'string',
    })
    public get codeTiers(): string {
        return this.getProp('codeTiers');
    }

    public set_codeTiers(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('codeTiers', value);
    }

    // read write property libTiers
    @boc.PropertyInfo({
        type: 'string',
    })
    public get libTiers(): string {
        return this.getProp('libTiers');
    }

    public set_libTiers(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('libTiers', value);
    }

    // relation lignes
    public lignes: boc.TransientMany<FactureDetailView, FactureMntView>;
}
