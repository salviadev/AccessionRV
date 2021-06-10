/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { FactureDetail } from '../../../models/FactureDetail';
@boc.ClsInfo({
    primaryKey: ['id'],
    modelConstr: FactureDetail,
    isTransient: true,
    mappingDef: [
        {
            from: '#model',
            mappings: [
                'libelle',
                'montant',
            ],
        },
    ],
    metadata: 'Accession',
})
export class FactureMntView extends boc.ViewModel<FactureDetail> {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        type: 'number',
        title: 'Id',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property codeArticle
    @boc.PropertyInfo({
        type: 'string',
    })
    public get codeArticle(): string {
        return this.getProp('codeArticle');
    }

    public set_codeArticle(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('codeArticle', value);
    }

    // read write property libArticle
    @boc.PropertyInfo({
        type: 'string',
    })
    public get libArticle(): string {
        return this.getProp('libArticle');
    }

    public set_libArticle(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('libArticle', value);
    }
}
