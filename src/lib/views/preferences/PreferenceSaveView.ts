/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { PreferenceView } from './PreferenceView';
@boc.ClsInfo({
    title: 'PreferenceSaveView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'models',
    ],
    metadata: 'Accession',
})
export class PreferenceSaveView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation models
            {
                constr: boc.TransientMany,
                settings: {
                    roleProp: 'models',
                    oppositeConstr: PreferenceView,
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

    // read write property modeCreate
    @boc.PropertyInfo({
        type: 'boolean',
    })
    public get modeCreate(): boolean {
        return this.getProp('modeCreate');
    }

    public set_modeCreate(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('modeCreate', value);
    }

    // read write property codeModel
    @boc.PropertyInfo({
        type: 'string',
    })
    public get codeModel(): string {
        return this.getProp('codeModel');
    }

    public set_codeModel(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('codeModel', value);
    }

    // read write property classe
    @boc.PropertyInfo({
        type: 'string',
    })
    public get classe(): string {
        return this.getProp('classe');
    }

    public set_classe(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('classe', value);
    }

    // read write property prive
    @boc.PropertyInfo({
        type: 'boolean',
    })
    public get prive(): boolean {
        return this.getProp('prive');
    }

    public set_prive(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('prive', value);
    }

    // read write property valeur
    @boc.PropertyInfo({
        jsFormats: ['memo'],
        type: 'string',
        format: 'memo',
        maxLength: 16000,
    })
    public get valeur(): string {
        return this.getProp('valeur');
    }

    public set_valeur(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('valeur', value);
    }

    // relation models
    public models: boc.TransientMany<PreferenceSaveView, PreferenceView>;
}
