/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { Tiers } from './Tiers';
import { FactureDetail } from './FactureDetail';
@boc.ClsInfo({
    description: 'Facture Client',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class Facture extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation details
            {
                constr: boc.HasMany,
                settings: {
                    roleProp: 'details',
                    oppositeConstr: FactureDetail,
                    key: ['id'],
                    oppositeKey: ['parentId'],
                    oppositeRoleProp: 'parentObject',
                }
            },
            // relation tiers
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'tiers',
                    oppositeConstr: Tiers,
                    key: ['refTiers'],
                    oppositeKey: ['code'],
                }
            },
        ];
    }

    // read only property refTiers
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get refTiers(): string {
        return this.getProp('refTiers');
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

    // read write property dtFact
    @boc.PropertyInfo({
        jsFormats: ['date'],
        type: 'string',
        format: 'date',
    })
    public get dtFact(): boc.NZDate {
        return this.getProp('dtFact');
    }

    public set_dtFact(value: boc.NZDate): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('dtFact', value);
    }

    // relation details
    public details: boc.HasMany<Facture, FactureDetail>;

    // relation tiers
    public tiers(): Promise<Tiers> {
        return this.getRoleProp('tiers');
    }

    public set_tiers(value: Tiers): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('tiers', value);
    }
}
