/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    description: 'contrôle accès - unité organisation',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class CAUniteOrga extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation parent
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'parent',
                    oppositeConstr: CAUniteOrga,
                    key: ['refParent'],
                    oppositeKey: ['code'],
                }
            },
        ];
    }

    // read only property refParent
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get refParent(): string {
        return this.getProp('refParent');
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
        title: 'libellé',
    })
    public get libelle(): string {
        return this.getProp('libelle');
    }

    public set_libelle(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('libelle', value);
    }

    // read write property libLong
    @boc.PropertyInfo({
        type: 'string',
    })
    public get libLong(): string {
        return this.getProp('libLong');
    }

    public set_libLong(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('libLong', value);
    }

    // read write property actif
    @boc.PropertyInfo({
        type: 'boolean',
    })
    public get actif(): boolean {
        return this.getProp('actif');
    }

    public set_actif(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('actif', value);
    }

    // relation parent
    public parent(): Promise<CAUniteOrga> {
        return this.getRoleProp('parent');
    }

    public set_parent(value: CAUniteOrga): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('parent', value);
    }
}
