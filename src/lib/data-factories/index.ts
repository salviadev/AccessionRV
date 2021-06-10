import { DataFactory } from '@phoenix/boc';
import { findAllDataFactory } from './find-all';
import { findArticleDataFactory } from './find-article';
import { findTiersDataFactory } from './find-tiers';

export const dataFactories: DataFactory[] = [
    findArticleDataFactory,
    findTiersDataFactory,
    findAllDataFactory,
];
