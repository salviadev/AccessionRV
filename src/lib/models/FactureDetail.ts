/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { Article } from './Article';
import { Facture } from './Facture';
@boc.ClsInfo({
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class FactureDetail extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation article
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'article',
                    oppositeConstr: Article,
                    key: ['refArticle'],
                    oppositeKey: ['code'],
                }
            },
            // relation parentObject
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'parentObject',
                    oppositeConstr: Facture,
                    key: ['parentId'],
                    oppositeKey: ['id'],
                    oppositeRoleProp: 'details',
                }
            },
        ];
    }

    // read only property refArticle
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
    })
    public get refArticle(): string {
        return this.getProp('refArticle');
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
    })
    public get libelle(): string {
        return this.getProp('libelle');
    }

    public set_libelle(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('libelle', value);
    }

    // read write property montant
    @boc.PropertyInfo({
        jsFormats: ['money'],
        type: 'number',
        format: 'money',
    })
    public get montant(): number {
        return this.getProp('montant');
    }

    public set_montant(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('montant', value);
    }

    // relation article
    public article(): Promise<Article> {
        return this.getRoleProp('article');
    }

    public set_article(value: Article): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('article', value);
    }

    // relation parentObject
    public parentObject(): Promise<Facture> {
        return this.getRoleProp('parentObject');
    }

    public set_parentObject(value: Facture): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('parentObject', value);
    }
}
