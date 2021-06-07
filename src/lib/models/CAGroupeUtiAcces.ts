/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { CARole } from './CARole';
import { CAUniteOrga } from './CAUniteOrga';
import { CAGroupeUti } from './CAGroupeUti';
@boc.ClsInfo({
    description: 'rôles par groupe',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class CAGroupeUtiAcces extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation role
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'role',
                    oppositeConstr: CARole,
                    key: ['refRole'],
                    oppositeKey: ['code'],
                }
            },
            // relation uniteOrga
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'uniteOrga',
                    oppositeConstr: CAUniteOrga,
                    key: ['refUniteOrga'],
                    oppositeKey: ['code'],
                }
            },
            // relation parentObject
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'parentObject',
                    oppositeConstr: CAGroupeUti,
                    key: ['parentId'],
                    oppositeKey: ['id'],
                    oppositeRoleProp: 'acces',
                }
            },
        ];
    }

    // read only property refRole
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get refRole(): string {
        return this.getProp('refRole');
    }

    // read only property refUniteOrga
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get refUniteOrga(): string {
        return this.getProp('refUniteOrga');
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

    // relation role
    public role(): Promise<CARole> {
        return this.getRoleProp('role');
    }

    public set_role(value: CARole): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('role', value);
    }

    // relation uniteOrga
    public uniteOrga(): Promise<CAUniteOrga> {
        return this.getRoleProp('uniteOrga');
    }

    public set_uniteOrga(value: CAUniteOrga): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('uniteOrga', value);
    }

    // relation parentObject
    public parentObject(): Promise<CAGroupeUti> {
        return this.getRoleProp('parentObject');
    }

    public set_parentObject(value: CAGroupeUti): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('parentObject', value);
    }
}
