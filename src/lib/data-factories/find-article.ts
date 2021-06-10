import * as boc from '@phoenix/boc';
import { DataDriverNames } from '../interfaces';

const findArticleDataFactorySettings: boc.FindDataFactorySettings = {
    datasetName: 'Article',
    entityName: 'Article',
    findOptions: {
        count: true,
        sort: 'code',
        select: ['code', 'libelle'],
        limit: 5,
    },
    metadataName: 'AccessionRV',
    objectStoreName: DataDriverNames.SpoDirect
};

export const findArticleDataFactory = new boc.FindDataFactory(findArticleDataFactorySettings);
