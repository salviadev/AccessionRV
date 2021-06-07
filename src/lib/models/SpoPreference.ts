/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class SpoPreference extends boc.ModelObject {
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

    // read write property classe
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get classe(): string {
        return this.getProp('classe');
    }

    public set_classe(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('classe', value);
    }

    // read write property util
    @boc.PropertyInfo({
        type: 'string',
    })
    public get util(): string {
        return this.getProp('util');
    }

    public set_util(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('util', value);
    }

    // read write property prive
    @boc.PropertyInfo({
        type: 'boolean',
    })
    public get prive(): boolean {
        return this.getProp('prive');
    }

    public set_prive(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('prive', value);
    }

    // read write property valeur
    @boc.PropertyInfo({
        jsFormats: ['json'],
        type: 'string',
        format: 'json',
    })
    public get valeur(): string {
        return this.getProp('valeur');
    }

    public set_valeur(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('valeur', value);
    }
}
