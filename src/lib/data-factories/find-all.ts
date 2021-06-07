import * as boc from '@phoenix/boc';
import { DataDriverNames } from '../interfaces';
import { FindOptions } from '@phoenix/boc-interfaces';

export const
    ALL_LOOKUP_OPTIONS = 'GET_ALL_LOOKUP_OPTIONS';

const findAllDataFactorySettings: boc.FindDataFactorySettings = {
    entityName: null,
    datasetName: 'AllEntities',
    findOptions: {
        count: true,
        limit: 5,
    },
    metadataName: 'AccessionRV',
    objectStoreName: DataDriverNames.SpoDirect
};
const beforeExecute: boc.FindDataFactoryBeforeExecute = async (parameters, loader) => {
    const c = parameters.container;
    const viewId = parameters.viewId;
    const oldPageNumber = loader.pageNumber;
    let data: { entityName: string; options: FindOptions } = null;
    if (viewId) {
        const viewRootInfo = c.getRootViewInfo(viewId);
        if (viewRootInfo) {
            const p: boc.DataFactoryParameters = { ...parameters };
            p.container = undefined;
            data = await viewRootInfo.viewModel.callAction<{ entityName: string; options: FindOptions }>(ALL_LOOKUP_OPTIONS, p);
        }
    }
    if (!data) {
        throw new boc.BOErr(c.t('FindOptions is null'));
    }
    loader.options = data.options;
    loader.entityName = data.entityName;
    loader.pageNumber = oldPageNumber;
};
export const findAllDataFactory = new boc.FindDataFactory(
    findAllDataFactorySettings, beforeExecute);
