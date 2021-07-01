/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'Poste budget',
    primaryKey: ['id'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class SpoPBPoste extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        type: 'string',
        title: 'Code',
        maxLength: 32,
    })
    public get id(): string {
        return this.getProp('id');
    }

    // read write property lib
    @boc.PropertyInfo({
        type: 'string',
        title: 'Libellé',
        maxLength: 200,
    })
    public get lib(): string {
        return this.getProp('lib');
    }

    public set_lib(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('lib', value);
    }

    // read write property cmnt
    @boc.PropertyInfo({
        jsFormats: ['memo'],
        type: 'string',
        format: 'memo',
        title: 'Commentaire',
        maxLength: 4000,
    })
    public get cmnt(): string {
        return this.getProp('cmnt');
    }

    public set_cmnt(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('cmnt', value);
    }

    // read write property pos
    @boc.PropertyInfo({
        type: 'string',
        title: 'Position',
        maxLength: 32,
    })
    public get pos(): string {
        return this.getProp('pos');
    }

    public set_pos(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('pos', value);
    }

    // read write property niveau
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Niveau hiérarchique',
    })
    public get niveau(): number {
        return this.getProp('niveau');
    }

    public set_niveau(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('niveau', value);
    }

    // read write property typstruct
    @boc.PropertyInfo({
        type: 'string',
        title: 'Type structure',
        maxLength: 10,
        enum: ['R', 'D', 'M'],
        enumNames: ['Recette', 'Dépense', 'Marge'],
    })
    public get typstruct(): string {
        return this.getProp('typstruct');
    }

    public set_typstruct(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('typstruct', value);
    }

    // read write property idpere
    @boc.PropertyInfo({
        type: 'string',
        title: 'Parent',
        maxLength: 32,
    })
    public get idpere(): string {
        return this.getProp('idpere');
    }

    public set_idpere(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('idpere', value);
    }

    // read write property soc
    @boc.PropertyInfo({
        type: 'string',
        title: 'Code société',
        maxLength: 32,
    })
    public get soc(): string {
        return this.getProp('soc');
    }

    public set_soc(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('soc', value);
    }

    // read write property codegf
    @boc.PropertyInfo({
        type: 'string',
        title: 'Code poste GF',
        maxLength: 50,
    })
    public get codegf(): string {
        return this.getProp('codegf');
    }

    public set_codegf(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('codegf', value);
    }

    // read write property codesmo
    @boc.PropertyInfo({
        type: 'string',
        title: 'Code SMO',
        maxLength: 50,
    })
    public get codesmo(): string {
        return this.getProp('codesmo');
    }

    public set_codesmo(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('codesmo', value);
    }

    // read write property carac
    @boc.PropertyInfo({
        type: 'string',
        title: 'Caractéristique',
        maxLength: 10,
    })
    public get carac(): string {
        return this.getProp('carac');
    }

    public set_carac(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('carac', value);
    }

    // read write property defaut
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'Est par défaut  (O/N)',
    })
    public get defaut(): boolean {
        return this.getProp('defaut');
    }

    public set_defaut(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('defaut', value);
    }

    // read write property nosaisie
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'Interdire la saisie (O/N)',
    })
    public get nosaisie(): boolean {
        return this.getProp('nosaisie');
    }

    public set_nosaisie(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('nosaisie', value);
    }

    // read write property moderpt
    @boc.PropertyInfo({
        type: 'string',
        title: 'Mode répartition',
        maxLength: 10,
    })
    public get moderpt(): string {
        return this.getProp('moderpt');
    }

    public set_moderpt(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('moderpt', value);
    }

    // read write property moderpttr
    @boc.PropertyInfo({
        type: 'string',
        title: 'Mode répartition Tranche',
        maxLength: 10,
    })
    public get moderpttr(): string {
        return this.getProp('moderpttr');
    }

    public set_moderpttr(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('moderpttr', value);
    }

    // read write property info
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'Information',
    })
    public get info(): boolean {
        return this.getProp('info');
    }

    public set_info(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('info', value);
    }

    // read write property modelebudget
    @boc.PropertyInfo({
        type: 'string',
        title: 'ModeleBudget',
        maxLength: 32,
    })
    public get modelebudget(): string {
        return this.getProp('modelebudget');
    }

    public set_modelebudget(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('modelebudget', value);
    }

    // read write property identmodelebudget
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'IdentiqueModeleBudget',
    })
    public get identmodelebudget(): boolean {
        return this.getProp('identmodelebudget');
    }

    public set_identmodelebudget(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('identmodelebudget', value);
    }

    // read write property inclustvamarge
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'inclusTvaMarge',
    })
    public get inclustvamarge(): boolean {
        return this.getProp('inclustvamarge');
    }

    public set_inclustvamarge(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('inclustvamarge', value);
    }

    // read write property colaxe
    @boc.PropertyInfo({
        type: 'string',
        title: 'colAxe',
        maxLength: 32,
    })
    public get colaxe(): string {
        return this.getProp('colaxe');
    }

    public set_colaxe(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('colaxe', value);
    }
}

export enum SpoPBPosteTypstruct {
    R = 'R',
    D = 'D',
    M = 'M',
}
export class SpoPBPosteTypstructTrad {
    public static getLibelle(code: string, c: boc.Container): string {
        switch (code) {
            case SpoPBPosteTypstruct.R: return c.t('Recette');
            case SpoPBPosteTypstruct.D: return c.t('Dépense');
            case SpoPBPosteTypstruct.M: return c.t('Marge'); default: return null;
        }
    }
}
