/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    description: 'Article',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class Article extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
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

    // read write property code
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
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
}
