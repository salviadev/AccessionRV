/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'TiersItemView',
    primaryKey: ['id'],
    isTransient: true,
    metadata: 'Accession',
})
export class TiersItemView extends boc.BaseViewModel {
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

    // read write property prix
    @boc.PropertyInfo({
        jsFormats: ['money'],
        type: 'number',
        format: 'money',
    })
    public get prix(): number {
        return this.getProp('prix');
    }

    public set_prix(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('prix', value);
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
