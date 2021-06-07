/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'PreferenceView',
    primaryKey: ['id'],
    isTransient: true,
    metadata: 'Accession',
})
export class PreferenceView extends boc.BaseViewModel {
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

    // read write property vide
    @boc.PropertyInfo({
        type: 'boolean',
    })
    public get vide(): boolean {
        return this.getProp('vide');
    }

    public set_vide(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('vide', value);
    }
}
