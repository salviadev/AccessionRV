import * as boc from '@phoenix/boc';
import { IObjectStore } from '@phoenix/boc-interfaces';
import { Utils } from './tools/utils';
import { IDataDriverConfigs, DataDriverNames } from './interfaces';
import { readdirSync, existsSync } from 'fs';
import * as path from 'path';

import { AccessionObjectStoreFactory, IAccessionObjectStoreFactorySettings } from './accession-object-store-factory';
import { AccessionSessionFactory } from './accession-session';

import { dataFactories } from './data-factories';
// odata handlers
// import { TiersOdataHandler } from './lookup/tiers';
import { FORMATTER_ID as xlsxFormatterId, XlsxPropFormatter } from './tools/xlsx-formatter';

export class Metadata extends boc.ModelMetadata {
    constructor(metadataName: string, classConstructors: any[], rules: any[]) {
        super(metadataName);
        this.registerGlobalActions({
            id: 'save',
            description: 'Sauvegarder les modifications',
            saveAfter: true,
            title: 'Sauvegarder',
        });
        this.registerTypes();
        this.registerClasses(...classConstructors);
        this.registerRuleClasses(...rules);
    }

    private registerTypes(): void {
        this.registerTypeSettings('string', { constr: boc.SimpleValue, adapter: boc.StringAdapter });
        this.registerTypeSettings('integer', { constr: boc.SimpleValue, adapter: boc.IntegerAdapter });
        this.registerTypeSettings('number', { constr: boc.SimpleValue, adapter: boc.DecimalAdapter });
        this.registerTypeSettings('code', { maxLength: 32 });
        this.registerTypeSettings('date-time', { adapter: boc.DateTimeAdapter });
        this.registerTypeSettings('date', { adapter: boc.DateAdapter });
        this.registerTypeSettings('money', { constr: boc.SimpleValue, adapter: boc.DecimalAdapter, decimals: 2 });
        this.registerTypeSettings('positive', { minimum: 0 });
        this.registerTypeSettings('notempty', { minLength: 1 });
        this.registerTypeSettings('memo', { maxLength: 8000 });
        this.registerTypeSettings('rate', { constr: boc.SimpleValue, adapter: boc.DecimalAdapter, decimals: 3 });
        this.registerTypeSettings('boolean', { constr: boc.SimpleValue, adapter: boc.BooleanAdapter });
    }
}
export class ViewServer extends boc.Server {

    public static loadModules(moduleDir: string, recursive: boolean) {
        const pathName = path.join(__dirname, moduleDir);
        const filesList = readdirSync(pathName);
        for (const fileName of filesList) {
            const ext = path.extname(fileName);
            const pathFileName = path.join(pathName, fileName);
            if (ext === '.js') {
                require(pathFileName);
            } else if (recursive && ext === '' && existsSync(pathFileName)) {
                const subDir = path.join(moduleDir, fileName);
                ViewServer.loadModules(subDir, recursive);
            }
        }
    }

    private static moduleLoaded: boolean = false;

    constructor() {
        const config = Utils.getConfig();
        const logger = Utils.getLogger().createChild(null, ['server']);
        const dataDriverOptions: IDataDriverConfigs =
            config && config.defaultDataDriverSettings ?
                config.defaultDataDriverSettings : {};

        // chargement automatique des modules
        if (!ViewServer.moduleLoaded) {
            ViewServer.loadModules('models', true);
            ViewServer.loadModules('views', true);
            ViewServer.loadModules('rules', true);
            ViewServer.moduleLoaded = true;
        }

        const accessionMetadata = new Metadata('Accession', [], []);

        // register automatique des classes
        accessionMetadata.registerClassesForMetatada('Accession');

        const objectStores = new Map<any, IObjectStore | boc.IObjectStoreFactory>();
        for (const storeName of DataDriverNames.all) {
            const defaultOptions = dataDriverOptions[storeName];
            if (defaultOptions) {
                const objectStoreFactoryOptions: IAccessionObjectStoreFactorySettings = {
                    dataDriverOptions: defaultOptions,
                };
                objectStores.set(storeName, new AccessionObjectStoreFactory(objectStoreFactoryOptions));
            }
        }
        if (!config.optimisation || !config.optimisation.noWiredRules) {
            accessionMetadata.wireRules();
        }
        const rights: any = null;
        super({
            objectStores,
            metadatas: [accessionMetadata],
            dataFactories,
            sessionFactory: new AccessionSessionFactory(),
            lockService: true,
            logger,
            rights,
            errorTranslator: Utils.translateError,
            ignoreCertificateErrors: config.ignoreCertificateErrors,
        });
        this.propFormatters.set(xlsxFormatterId, new XlsxPropFormatter());
    }
}
