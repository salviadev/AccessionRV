/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { GedDocumentReference } from './GedDocumentReference';
@boc.ClsInfo({
    title: 'GED Document',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class GedDocument extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation refs
            {
                constr: boc.HasMany,
                settings: {
                    roleProp: 'refs',
                    oppositeConstr: GedDocumentReference,
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
    })
    public get libelle(): string {
        return this.getProp('libelle');
    }

    public set_libelle(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('libelle', value);
    }

    // read write property dateCreation
    @boc.PropertyInfo({
        jsFormats: ['date-time'],
        type: 'string',
        format: 'date-time',
        title: 'date création',
    })
    public get dateCreation(): boc.DateTime {
        return this.getProp('dateCreation');
    }

    public set_dateCreation(value: boc.DateTime): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('dateCreation', value);
    }

    // read write property dateModif
    @boc.PropertyInfo({
        jsFormats: ['date-time'],
        type: 'string',
        format: 'date-time',
        title: 'date dernière modification',
    })
    public get dateModif(): boc.DateTime {
        return this.getProp('dateModif');
    }

    public set_dateModif(value: boc.DateTime): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('dateModif', value);
    }

    // read write property commentaire
    @boc.PropertyInfo({
        jsFormats: ['memo'],
        type: 'string',
        format: 'memo',
    })
    public get commentaire(): string {
        return this.getProp('commentaire');
    }

    public set_commentaire(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('commentaire', value);
    }

    // read write property proprietaire
    @boc.PropertyInfo({
        type: 'string',
    })
    public get proprietaire(): string {
        return this.getProp('proprietaire');
    }

    public set_proprietaire(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('proprietaire', value);
    }

    // read write property classement
    @boc.PropertyInfo({
        type: 'string',
        description: 'Dossier1/Dossier2/Dossier3',
    })
    public get classement(): string {
        return this.getProp('classement');
    }

    public set_classement(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('classement', value);
    }

    // read write property typeDoc
    @boc.PropertyInfo({
        type: 'string',
    })
    public get typeDoc(): string {
        return this.getProp('typeDoc');
    }

    public set_typeDoc(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('typeDoc', value);
    }

    // read write property tailleFichier
    @boc.PropertyInfo({
        jsFormats: ['integer', 'int64'],
        type: 'integer',
        format: 'int64',
        description: 'taille en octet',
    })
    public get tailleFichier(): number {
        return this.getProp('tailleFichier');
    }

    public set_tailleFichier(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('tailleFichier', value);
    }

    // read write property refFichier
    @boc.PropertyInfo({
        type: 'string',
        description: 'uid|http://xxxx|file://xxxx|chemin_relatif',
    })
    public get refFichier(): string {
        return this.getProp('refFichier');
    }

    public set_refFichier(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('refFichier', value);
    }

    // read write property stockage
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
        description: 'nom du config du stockage',
    })
    public get stockage(): string {
        return this.getProp('stockage');
    }

    public set_stockage(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('stockage', value);
    }

    // relation refs
    public refs: boc.HasMany<GedDocument, GedDocumentReference>;
}
