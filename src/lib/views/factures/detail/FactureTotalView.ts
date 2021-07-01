/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    primaryKey: ['id'],
    isTransient: true,
    metadata: 'Accession',
})
export class FactureTotalView extends boc.BaseViewModel {
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

    // read write property montant
    @boc.PropertyInfo({
        jsFormats: ['money'],
        type: 'number',
        format: 'money',
    })
    public get montant(): number {
        return this.getProp('montant');
    }

    public set_montant(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('montant', value);
    }
}
