/* tslint:disable */
// This is a generated file
import * as boc from '@phoenix/boc';
import { GedDocument } from './GedDocument';
@boc.ClsInfo({
    primaryKey: ['id'],
    objectStoreSource: 'SpoDirect',
    metadata: 'Accession',
})
export class GedDocumentReference extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation parentObject
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'parentObject',
                    oppositeConstr: GedDocument,
                    key: ['parentId'],
                    oppositeKey: ['id'],
                    oppositeRoleProp: 'refs',
                }
            },
        ];
    }

    // read only property parentId
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
    })
    public get parentId(): number {
        return this.getProp('parentId');
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property ref0
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref0(): string {
        return this.getProp('ref0');
    }

    public set_ref0(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref0', value);
    }

    // read write property ref1
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref1(): string {
        return this.getProp('ref1');
    }

    public set_ref1(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref1', value);
    }

    // read write property ref2
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref2(): string {
        return this.getProp('ref2');
    }

    public set_ref2(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref2', value);
    }

    // read write property ref3
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref3(): string {
        return this.getProp('ref3');
    }

    public set_ref3(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref3', value);
    }

    // read write property ref4
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref4(): string {
        return this.getProp('ref4');
    }

    public set_ref4(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref4', value);
    }

    // read write property ref5
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref5(): string {
        return this.getProp('ref5');
    }

    public set_ref5(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref5', value);
    }

    // read write property ref6
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref6(): string {
        return this.getProp('ref6');
    }

    public set_ref6(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref6', value);
    }

    // read write property ref7
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref7(): string {
        return this.getProp('ref7');
    }

    public set_ref7(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref7', value);
    }

    // read write property ref8
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref8(): string {
        return this.getProp('ref8');
    }

    public set_ref8(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref8', value);
    }

    // read write property ref9
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref9(): string {
        return this.getProp('ref9');
    }

    public set_ref9(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref9', value);
    }

    // read write property ref10
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref10(): string {
        return this.getProp('ref10');
    }

    public set_ref10(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref10', value);
    }

    // read write property ref11
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref11(): string {
        return this.getProp('ref11');
    }

    public set_ref11(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref11', value);
    }

    // read write property ref12
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref12(): string {
        return this.getProp('ref12');
    }

    public set_ref12(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref12', value);
    }

    // read write property ref13
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref13(): string {
        return this.getProp('ref13');
    }

    public set_ref13(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref13', value);
    }

    // read write property ref14
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref14(): string {
        return this.getProp('ref14');
    }

    public set_ref14(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref14', value);
    }

    // read write property ref15
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref15(): string {
        return this.getProp('ref15');
    }

    public set_ref15(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref15', value);
    }

    // read write property ref16
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref16(): string {
        return this.getProp('ref16');
    }

    public set_ref16(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref16', value);
    }

    // read write property ref17
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref17(): string {
        return this.getProp('ref17');
    }

    public set_ref17(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref17', value);
    }

    // read write property ref18
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref18(): string {
        return this.getProp('ref18');
    }

    public set_ref18(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref18', value);
    }

    // read write property ref19
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref19(): string {
        return this.getProp('ref19');
    }

    public set_ref19(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref19', value);
    }

    // read write property ref20
    @boc.PropertyInfo({
        type: 'string',
    })
    public get ref20(): string {
        return this.getProp('ref20');
    }

    public set_ref20(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('ref20', value);
    }

    // relation parentObject
    public parentObject(): Promise<GedDocument> {
        return this.getRoleProp('parentObject');
    }

    public set_parentObject(value: GedDocument): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('parentObject', value);
    }
}
