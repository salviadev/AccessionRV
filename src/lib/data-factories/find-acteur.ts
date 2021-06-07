import * as boc from '@phoenix/boc';
import { DataDriverNames } from '../interfaces';

const findOPActeurDataFactorySettings: boc.FindDataFactorySettings = {
    datasetName: 'OPActeur',
    entityName: 'OPActeur',
    findOptions: {
        count: true,
        sort: 'code',
        select: ['code', 'libelle'],
        limit: 5,
    },
    metadataName: 'AccessionRV',
    objectStoreName: DataDriverNames.SpoDirect
};

export const findOPActeurDataFactory = new boc.FindDataFactory(findOPActeurDataFactorySettings);
