/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { CAGroupeUtiAcces } from './CAGroupeUtiAcces';
@boc.ClsInfo({
    description: 'contrôle accès - groupe utilisateurs',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class CAGroupeUti extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation acces
            {
                constr: boc.HasMany,
                settings: {
                    roleProp: 'acces',
                    oppositeConstr: CAGroupeUtiAcces,
                    key: ['id'],
                    oppositeKey: ['parentId'],
                    oppositeRoleProp: 'parentObject',
                }
            },
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
        title: 'libellé',
    })
    public get libelle(): string {
        return this.getProp('libelle');
    }

    public set_libelle(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('libelle', value);
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

    // read write property isAdmin
    @boc.PropertyInfo({
        type: 'boolean',
    })
    public get isAdmin(): boolean {
        return this.getProp('isAdmin');
    }

    public set_isAdmin(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('isAdmin', value);
    }

    // relation acces
    public acces: boc.HasMany<CAGroupeUti, CAGroupeUtiAcces>;
}
