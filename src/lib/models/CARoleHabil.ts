/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { CARole } from './CARole';
@boc.ClsInfo({
    description: 'habilitations par rôle',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class CARoleHabil extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation parentObject
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'parentObject',
                    oppositeConstr: CARole,
                    key: ['parentId'],
                    oppositeKey: ['id'],
                    oppositeRoleProp: 'habilitations',
                }
            },
        ];
    }

    // read only property parentId
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
    })
    public get parentId(): number {
        return this.getProp('parentId');
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

    // read write property action
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get action(): string {
        return this.getProp('action');
    }

    public set_action(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('action', value);
    }

    // read write property niveau
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get niveau(): string {
        return this.getProp('niveau');
    }

    public set_niveau(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('niveau', value);
    }

    // relation parentObject
    public parentObject(): Promise<CARole> {
        return this.getRoleProp('parentObject');
    }

    public set_parentObject(value: CARole): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('parentObject', value);
    }
}
