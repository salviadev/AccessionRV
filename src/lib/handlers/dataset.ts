import * as bocServer from '@phoenix/boc-server';
import { m } from '@phoenix/service-route';

export class DatasetHandler extends bocServer.DatasetHandler {
    constructor() {
        super();
    }
    @m({
        tags: ['Dataset'],
        summary: 'Dataset',
        parameters: [
            {
                name: 'datasetName',
                description: 'dataset name',
                in: 'path',
                type: 'string',
                required: true,
            },
            {
                name: '$filter',
                description: 'filter',
                in: 'query',
                type: 'string',
                required: false,
            },
            {
                name: '$orderby',
                description: 'orderby',
                in: 'query',
                type: 'string',
                required: false,
            },
            {
                name: '$top',
                description: 'orderby',
                in: 'query',
                type: 'number',
                required: false,
            },
            {
                name: '$skip',
                description: 'skip',
                in: 'query',
                type: 'number',
                required: false,
            },
            {
                name: 'containerId',
                description: 'containerId',
                in: 'query',
                type: 'string',
                required: false,
            },
            {
                name: 'viewId',
                description: 'viewId',
                in: 'query',
                type: 'number',
                required: false,
            },
            {
                name: 'data',
                description: 'extraData',
                in: 'query',
                type: 'string',
                required: false,
            },
        ],
    })
    // tslint:disable-next-line:max-line-length
    public get(datasetName: string, $filter: string, $orderby: string, $top: number, $skip: number, containerId: string, viewId: number, data: string): Promise<any> {
        return super.get(datasetName, $filter, $orderby, $top, $skip, containerId, viewId, data);
    }
    @m({
        tags: ['Dataset'],
        summary: 'Dataset',
        parameters: [
            {
                name: 'datasetName',
                description: 'dataset name',
                in: 'path',
                type: 'string',
                required: true,
            },
            {
                name: '$filter',
                description: 'filter',
                in: 'query',
                type: 'string',
                required: false,
            },
            {
                name: '$orderby',
                description: 'orderby',
                in: 'query',
                type: 'string',
                required: false,
            },
            {
                name: '$top',
                description: 'orderby',
                in: 'query',
                type: 'number',
                required: false,
            },
            {
                name: '$skip',
                description: 'skip',
                in: 'query',
                type: 'number',
                required: false,
            },
            {
                name: 'containerId',
                description: 'containerId',
                in: 'query',
                type: 'string',
                required: false,
            },
            {
                name: 'viewId',
                description: 'viewId',
                in: 'query',
                type: 'number',
                required: false,
            },
            {
                name: 'data',
                description: 'extraData',
                in: 'query',
                type: 'string',
                required: false,
            },
        ],
    })
    // tslint:disable-next-line:max-line-length
    public post(datasetName: string, $filter: string, $orderby: string, $top: number, $skip: number, containerId: string, viewId: number, body: any): Promise<any> {
        return super.post(datasetName, $filter, $orderby, $top, $skip, containerId, viewId, body);
    }
}
