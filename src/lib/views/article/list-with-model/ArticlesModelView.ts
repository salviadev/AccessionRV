/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { PaginatedListView } from '../../tools/PaginatedListView';
import { ArticlesItemModelView } from './ArticlesItemModelView';
import { ArticlesModelTotalView } from './ArticlesModelTotalView';
@boc.ClsInfo({
    title: 'ArticlesModelView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'total',
        'articles',
        'models',
    ],
    metadata: 'Accession',
})
export class ArticlesModelView extends PaginatedListView {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation total
            {
                constr: boc.TransientReference,
                settings: {
                    roleProp: 'total',
                    oppositeConstr: ArticlesModelTotalView,
                }
            },
            // relation articles
            {
                constr: boc.FindRelation,
                settings: {
                    roleProp: 'articles',
                    oppositeConstr: ArticlesItemModelView,
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
    public total(): Promise<ArticlesModelTotalView> {
        return this.getRoleProp('total');
    }

    public set_total(value: ArticlesModelTotalView): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('total', value);
    }

    // relation articles
    public articles: boc.FindRelation<ArticlesModelView, ArticlesItemModelView>;
}
