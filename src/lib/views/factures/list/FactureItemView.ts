/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'FactureItemView',
    primaryKey: ['id'],
    isTransient: true,
    metadata: 'Accession',
})
export class FactureItemView extends boc.BaseViewModel {
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

    // read write property code
    @boc.PropertyInfo({
        type: 'string',
    })
    public get code(): string {
        return this.getProp('code');
    }

    public set_code(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('code', value);
    }

    // read write property libelle
    @boc.PropertyInfo({
        type: 'string',
    })
    public get libelle(): string {
        return this.getProp('libelle');
    }

    public set_libelle(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('libelle', value);
    }
}
