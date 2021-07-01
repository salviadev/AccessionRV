/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { PosteItemView } from './PosteItemView';
@boc.ClsInfo({
    title: 'PostesView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'postes',
    ],
    metadata: 'Accession',
})
export class PostesView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation postes
            {
                constr: boc.TransientMany,
                settings: {
                    roleProp: 'postes',
                    oppositeConstr: PosteItemView,
                }
            },
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        type: 'number',
        title: 'Id',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // relation postes
    public postes: boc.TransientMany<PostesView, PosteItemView>;
}
