import { DataFactory } from '@phoenix/boc';
import { findAllDataFactory } from './find-all';
import { findOPActeurDataFactory } from './find-acteur';

export const dataFactories: DataFactory[] = [
    findOPActeurDataFactory,
    findAllDataFactory,
];
