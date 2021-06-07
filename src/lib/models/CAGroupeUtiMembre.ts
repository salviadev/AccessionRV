/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { CAGroupeUti } from './CAGroupeUti';
@boc.ClsInfo({
    description: 'membres du groupe',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class CAGroupeUtiMembre extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation groupe
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'groupe',
                    oppositeConstr: CAGroupeUti,
                    key: ['refGroupe'],
                    oppositeKey: ['code'],
                }
            },
        ];
    }

    // read only property refGroupe
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get refGroupe(): string {
        return this.getProp('refGroupe');
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

    // read write property refUti
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get refUti(): string {
        return this.getProp('refUti');
    }

    public set_refUti(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('refUti', value);
    }

    // relation groupe
    public groupe(): Promise<CAGroupeUti> {
        return this.getRoleProp('groupe');
    }

    public set_groupe(value: CAGroupeUti): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('groupe', value);
    }
}
