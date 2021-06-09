/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'ArticlesTotalView',
    primaryKey: ['id'],
    isTransient: true,
    metadata: 'Accession',
})
export class ArticlesTotalView extends boc.BaseViewModel {
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

    // read write property prix
    @boc.PropertyInfo({
        jsFormats: ['money'],
        type: 'number',
        format: 'money',
    })
    public get prix(): number {
        return this.getProp('prix');
    }

    public set_prix(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('prix', value);
    }
}
