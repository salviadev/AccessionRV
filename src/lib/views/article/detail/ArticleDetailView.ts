/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { Article } from '../../../models/Article';
@boc.ClsInfo({
    title: 'ArticleDetailView',
    primaryKey: ['id'],
    modelConstr: Article,
    isTransient: true,
    mappingDef: [
        {
            from: '#model',
            mappings: [
                'code',
                'libelle',
                'prix',
            ],
        },
    ],
    metadata: 'Accession',
})
export class ArticleDetailView extends boc.ViewModel<Article> {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
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

    // read write property tabs
    @boc.PropertyInfo({
        type: 'string',
        enum: ['I', 'P'],
        enumNames: ['Identification', 'Prix'],
    })
    public get tabs(): string {
        return this.getProp('tabs');
    }

    public set_tabs(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('tabs', value);
    }
}

export enum ArticleDetailViewTabs {
    I = 'I',
    P = 'P',
}
export class ArticleDetailViewTabsTrad {
    public static getLibelle(code: string, c: boc.Container): string {
        switch (code) {
            case ArticleDetailViewTabs.I: return c.t('Identification');
            case ArticleDetailViewTabs.P: return c.t('Prix'); default: return null;
        }
    }
}
