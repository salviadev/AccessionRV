/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'GED Fichier',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class GedFichier extends boc.ModelObject {
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
        title: 'Url',
    })
    public get code(): string {
        return this.getProp('code');
    }

    public set_code(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('code', value);
    }

    // read write property nomFichier
    @boc.PropertyInfo({
        type: 'string',
    })
    public get nomFichier(): string {
        return this.getProp('nomFichier');
    }

    public set_nomFichier(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('nomFichier', value);
    }

    // read write property typeFichier
    @boc.PropertyInfo({
        type: 'string',
    })
    public get typeFichier(): string {
        return this.getProp('typeFichier');
    }

    public set_typeFichier(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('typeFichier', value);
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

    // read write property dataFichier
    @boc.PropertyInfo({
        jsFormats: ['stream'],
        type: 'string',
        format: 'stream',
    })
    public get dataFichier(): string {
        return this.getProp('dataFichier');
    }

    public set_dataFichier(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('dataFichier', value);
    }
}
