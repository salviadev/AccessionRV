/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'Programme',
    primaryKey: ['id'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class SpoProgramme extends boc.ModelObject {
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

    // read write property idop
    @boc.PropertyInfo({
        type: 'string',
        title: 'Code opération',
        maxLength: 32,
    })
    public get idop(): string {
        return this.getProp('idop');
    }

    public set_idop(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('idop', value);
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

    // read write property codegf
    @boc.PropertyInfo({
        type: 'string',
        title: 'Code programme GF',
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

    // read write property activite
    @boc.PropertyInfo({
        type: 'string',
        title: 'Activite',
        maxLength: 10,
    })
    public get activite(): string {
        return this.getProp('activite');
    }

    public set_activite(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('activite', value);
    }

    // read write property natrv
    @boc.PropertyInfo({
        type: 'string',
        title: 'Nature de travaux',
        maxLength: 10,
    })
    public get natrv(): string {
        return this.getProp('natrv');
    }

    public set_natrv(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('natrv', value);
    }

    // read write property typeprog
    @boc.PropertyInfo({
        type: 'string',
        title: 'Type programme',
        maxLength: 10,
    })
    public get typeprog(): string {
        return this.getProp('typeprog');
    }

    public set_typeprog(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('typeprog', value);
    }

    // read write property typfin
    @boc.PropertyInfo({
        type: 'string',
        title: 'Type financement',
        maxLength: 10,
    })
    public get typfin(): string {
        return this.getProp('typfin');
    }

    public set_typfin(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('typfin', value);
    }

    // read write property typouv
    @boc.PropertyInfo({
        type: 'string',
        title: 'Type ouvrage',
        maxLength: 10,
    })
    public get typouv(): string {
        return this.getProp('typouv');
    }

    public set_typouv(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('typouv', value);
    }

    // read write property regfisc
    @boc.PropertyInfo({
        type: 'string',
        title: 'Régime fiscal',
        maxLength: 32,
    })
    public get regfisc(): string {
        return this.getProp('regfisc');
    }

    public set_regfisc(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('regfisc', value);
    }

    // read write property nivliv
    @boc.PropertyInfo({
        type: 'string',
        title: 'Niveau de livraison',
        maxLength: 10,
    })
    public get nivliv(): string {
        return this.getProp('nivliv');
    }

    public set_nivliv(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('nivliv', value);
    }

    // read write property modinterv
    @boc.PropertyInfo({
        type: 'string',
        title: 'Mode intervention',
        maxLength: 10,
    })
    public get modinterv(): string {
        return this.getProp('modinterv');
    }

    public set_modinterv(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('modinterv', value);
    }

    // read write property finorig
    @boc.PropertyInfo({
        type: 'string',
        title: 'Financement origine',
        maxLength: 20,
    })
    public get finorig(): string {
        return this.getProp('finorig');
    }

    public set_finorig(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('finorig', value);
    }

    // read write property csa
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'Construction sur sol autrui (O/N)',
    })
    public get csa(): boolean {
        return this.getProp('csa');
    }

    public set_csa(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('csa', value);
    }

    // read write property annee
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Annee',
    })
    public get annee(): number {
        return this.getProp('annee');
    }

    public set_annee(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('annee', value);
    }

    // read write property etape
    @boc.PropertyInfo({
        type: 'string',
        title: 'Etape Budgétaire',
        maxLength: 10,
    })
    public get etape(): string {
        return this.getProp('etape');
    }

    public set_etape(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('etape', value);
    }

    // read write property csd
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'Création secteur distinct',
    })
    public get csd(): boolean {
        return this.getProp('csd');
    }

    public set_csd(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('csd', value);
    }

    // read write property clerepart
    @boc.PropertyInfo({
        type: 'number',
        title: 'Clé de répartition',
        decimals: 2,
    })
    public get clerepart(): number {
        return this.getProp('clerepart');
    }

    public set_clerepart(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('clerepart', value);
    }

    // read write property structure
    @boc.PropertyInfo({
        type: 'string',
        title: 'Structure',
        maxLength: 10,
    })
    public get structure(): string {
        return this.getProp('structure');
    }

    public set_structure(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('structure', value);
    }

    // read write property datecsd
    @boc.PropertyInfo({
        jsFormats: ['date'],
        type: 'string',
        format: 'date',
        title: 'Date',
    })
    public get datecsd(): boc.NZDate {
        return this.getProp('datecsd');
    }

    public set_datecsd(value: boc.NZDate): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('datecsd', value);
    }

    // read write property tranchetravaux
    @boc.PropertyInfo({
        type: 'string',
        title: 'Identifant tranche travaux',
        maxLength: 32,
    })
    public get tranchetravaux(): string {
        return this.getProp('tranchetravaux');
    }

    public set_tranchetravaux(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('tranchetravaux', value);
    }

    // read write property naturetype
    @boc.PropertyInfo({
        type: 'string',
        title: 'Identifiant Nature - type ouvrage',
        maxLength: 32,
    })
    public get naturetype(): string {
        return this.getProp('naturetype');
    }

    public set_naturetype(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('naturetype', value);
    }

    // read write property typecomm
    @boc.PropertyInfo({
        type: 'string',
        title: 'TypeComm',
        maxLength: 10,
    })
    public get typecomm(): string {
        return this.getProp('typecomm');
    }

    public set_typecomm(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('typecomm', value);
    }

    // read write property tauxtva
    @boc.PropertyInfo({
        type: 'number',
        title: 'Taux de TVA',
        decimals: 2,
    })
    public get tauxtva(): number {
        return this.getProp('tauxtva');
    }

    public set_tauxtva(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('tauxtva', value);
    }

    // read write property statut
    @boc.PropertyInfo({
        type: 'string',
        title: 'Statut',
        maxLength: 10,
    })
    public get statut(): string {
        return this.getProp('statut');
    }

    public set_statut(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('statut', value);
    }

    // read write property postebudvente
    @boc.PropertyInfo({
        type: 'string',
        title: 'Poste budgétaire de vente',
        maxLength: 32,
    })
    public get postebudvente(): string {
        return this.getProp('postebudvente');
    }

    public set_postebudvente(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('postebudvente', value);
    }

    // read write property esttranche
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'EstTranche',
    })
    public get esttranche(): boolean {
        return this.getProp('esttranche');
    }

    public set_esttranche(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('esttranche', value);
    }

    // read write property nomcom
    @boc.PropertyInfo({
        type: 'string',
        title: 'Nom commercial',
        maxLength: 100,
    })
    public get nomcom(): string {
        return this.getProp('nomcom');
    }

    public set_nomcom(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('nomcom', value);
    }

    // read write property existegp
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'ExisteGP',
    })
    public get existegp(): boolean {
        return this.getProp('existegp');
    }

    public set_existegp(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('existegp', value);
    }

    // read write property surfbrute
    @boc.PropertyInfo({
        type: 'number',
        title: 'SurfBrute',
        decimals: 4,
    })
    public get surfbrute(): number {
        return this.getProp('surfbrute');
    }

    public set_surfbrute(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('surfbrute', value);
    }

    // read write property surfvendu
    @boc.PropertyInfo({
        type: 'number',
        title: 'SurfVendu',
        decimals: 4,
    })
    public get surfvendu(): number {
        return this.getProp('surfvendu');
    }

    public set_surfvendu(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('surfvendu', value);
    }

    // read write property ratiosurfvb
    @boc.PropertyInfo({
        type: 'number',
        title: 'RatioSurfVB',
        decimals: 4,
    })
    public get ratiosurfvb(): number {
        return this.getProp('ratiosurfvb');
    }

    public set_ratiosurfvb(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ratiosurfvb', value);
    }

    // read write property dation
    @boc.PropertyInfo({
        jsFormats: ['mgdis-boolean'],
        type: 'boolean',
        format: 'mgdis-boolean',
        title: 'Dation',
    })
    public get dation(): boolean {
        return this.getProp('dation');
    }

    public set_dation(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('dation', value);
    }

    // read write property optiontva
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
        title: 'optionTva',
        maxLength: 10,
        enum: ['TC', 'TMI', 'TM'],
        enumNames: ['TVA classique', 'TVA sur marge inclus', 'TVA sur marge non inclus'],
    })
    public get optiontva(): string {
        return this.getProp('optiontva');
    }

    public set_optiontva(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('optiontva', value);
    }

    // read write property repartvamarge
    @boc.PropertyInfo({
        type: 'string',
        title: 'reparTvaMarge',
        maxLength: 10,
    })
    public get repartvamarge(): string {
        return this.getProp('repartvamarge');
    }

    public set_repartvamarge(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('repartvamarge', value);
    }

    // read write property postetvamarge
    @boc.PropertyInfo({
        type: 'string',
        title: 'posteTvaMarge',
        maxLength: 32,
    })
    public get postetvamarge(): string {
        return this.getProp('postetvamarge');
    }

    public set_postetvamarge(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('postetvamarge', value);
    }

    // read write property idproced
    @boc.PropertyInfo({
        type: 'string',
        title: 'idProced',
        maxLength: 32,
    })
    public get idproced(): string {
        return this.getProp('idproced');
    }

    public set_idproced(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('idproced', value);
    }

    // read write property postedation
    @boc.PropertyInfo({
        type: 'string',
        title: 'PosteDation',
        maxLength: 32,
    })
    public get postedation(): string {
        return this.getProp('postedation');
    }

    public set_postedation(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('postedation', value);
    }

    // read write property idinitial
    @boc.PropertyInfo({
        type: 'string',
        title: 'idInitial',
        maxLength: 32,
    })
    public get idinitial(): string {
        return this.getProp('idinitial');
    }

    public set_idinitial(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('idinitial', value);
    }

    // read write property idreference
    @boc.PropertyInfo({
        type: 'string',
        title: 'idreference',
        maxLength: 32,
    })
    public get idreference(): string {
        return this.getProp('idreference');
    }

    public set_idreference(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('idreference', value);
    }

    // read write property methodetvamarge
    @boc.PropertyInfo({
        type: 'string',
        title: 'Methodd TVA sur Marge',
        maxLength: 32,
    })
    public get methodetvamarge(): string {
        return this.getProp('methodetvamarge');
    }

    public set_methodetvamarge(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('methodetvamarge', value);
    }
}

export enum SpoProgrammeOptiontva {
    TC = 'TC',
    TMI = 'TMI',
    TM = 'TM',
}
export class SpoProgrammeOptiontvaTrad {
    public static getLibelle(code: string, c: boc.Container): string {
        switch (code) {
            case SpoProgrammeOptiontva.TC: return c.t('TVA classique');
            case SpoProgrammeOptiontva.TMI: return c.t('TVA sur marge inclus');
            case SpoProgrammeOptiontva.TM: return c.t('TVA sur marge non inclus'); default: return null;
        }
    }
}
