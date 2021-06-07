/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { PreferenceView } from '../preferences/PreferenceView';
@boc.ClsInfo({
    title: 'PaginatedListView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'models',
    ],
    metadata: 'Accession',
})
export class PaginatedListView extends boc.BaseViewModel {
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
    public static $method: { [key: string]: string } = {
        getList: 'PaginatedListView.getList',
    }
    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Id.',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property searchText
    @boc.PropertyInfo({
        type: 'string',
        title: 'Search',
    })
    public get searchText(): string {
        return this.getProp('searchText');
    }

    public set_searchText(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('searchText', value);
    }

    // read write property search
    @boc.PropertyInfo({
        type: 'string',
    })
    public get search(): string {
        return this.getProp('search');
    }

    public set_search(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('search', value);
    }

    // read write property modelCode
    @boc.PropertyInfo({
        type: 'string',
        title: 'Modelé',
    })
    public get modelCode(): string {
        return this.getProp('modelCode');
    }

    public set_modelCode(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('modelCode', value);
    }

    // read write property modelTitle
    @boc.PropertyInfo({
        type: 'string',
        title: 'Modelé',
    })
    public get modelTitle(): string {
        return this.getProp('modelTitle');
    }

    public set_modelTitle(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('modelTitle', value);
    }

    // read write property classePref
    @boc.PropertyInfo({
        type: 'string',
        title: 'Preference code',
    })
    public get classePref(): string {
        return this.getProp('classePref');
    }

    public set_classePref(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('classePref', value);
    }

    // read write property userLastFilterCode
    @boc.PropertyInfo({
        type: 'string',
    })
    public get userLastFilterCode(): string {
        return this.getProp('userLastFilterCode');
    }

    public set_userLastFilterCode(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('userLastFilterCode', value);
    }

    // read write property lastModelPath
    @boc.PropertyInfo({
        type: 'string',
    })
    public get lastModelPath(): string {
        return this.getProp('lastModelPath');
    }

    public set_lastModelPath(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('lastModelPath', value);
    }

    // read write property listPropName
    @boc.PropertyInfo({
        type: 'string',
    })
    public get listPropName(): string {
        return this.getProp('listPropName');
    }

    public set_listPropName(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('listPropName', value);
    }

    // method getList
    public getList(data?: any): Promise<boc.FindRelation<boc.BaseViewModel, boc.BaseViewModel>> {
        return this.callAction<boc.FindRelation<boc.BaseViewModel, boc.BaseViewModel>>(PaginatedListView.$method.getList, data);
    }

    // relation models
    public models: boc.TransientMany<PaginatedListView, PreferenceView>;
}
