/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { ArticlesItemView } from './ArticlesItemView';
import { ArticlesTotalView } from './ArticlesTotalView';
@boc.ClsInfo({
    title: 'ArticlesView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'total',
        'articles',
    ],
    metadata: 'Accession',
})
export class ArticlesView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation total
            {
                constr: boc.TransientReference,
                settings: {
                    roleProp: 'total',
                    oppositeConstr: ArticlesTotalView,
                }
            },
            // relation articles
            {
                constr: boc.FindRelation,
                settings: {
                    roleProp: 'articles',
                    oppositeConstr: ArticlesItemView,
                    instanceOptions: true,
                    findClass: 'Article',
                    findOptions: {
                        select: [
                            'code',
                            'libelle',
                            'prix',
                        ],
                        count: true,
                        optimizeCount: true,
                        limit: 20,
                        sort: [
                            'libelle',
                        ],
                    },
                }
            },
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

    // relation total
    public total(): Promise<ArticlesTotalView> {
        return this.getRoleProp('total');
    }

    public set_total(value: ArticlesTotalView): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('total', value);
    }

    // relation articles
    public articles: boc.FindRelation<ArticlesView, ArticlesItemView>;
}
