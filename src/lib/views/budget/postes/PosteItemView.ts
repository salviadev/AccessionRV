/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'PosteItemView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'postes',
    ],
    metadata: 'Accession',
})
export class PosteItemView extends boc.BaseViewModel {
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

    // read write property code
    @boc.PropertyInfo({
        type: 'string',
        title: 'Code',
    })
    public get code(): string {
        return this.getProp('code');
    }

    public set_code(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('code', value);
    }

    // read write property title
    @boc.PropertyInfo({
        type: 'string',
        title: 'Title',
    })
    public get title(): string {
        return this.getProp('title');
    }

    public set_title(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('title', value);
    }

    // relation postes
    public postes: boc.TransientMany<PosteItemView, PosteItemView>;
}
