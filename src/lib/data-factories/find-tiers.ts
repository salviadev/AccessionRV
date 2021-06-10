import * as boc from '@phoenix/boc';
import { DataDriverNames } from '../interfaces';

const findTiersDataFactorySettings: boc.FindDataFactorySettings = {
    datasetName: 'Tiers',
    entityName: 'Tiers',
    findOptions: {
        count: true,
        sort: 'code',
        select: ['code', 'libelle'],
        limit: 5,
    },
    metadataName: 'AccessionRV',
    objectStoreName: DataDriverNames.SpoDirect
};

export const findTiersDataFactory = new boc.FindDataFactory(findTiersDataFactorySettings);
