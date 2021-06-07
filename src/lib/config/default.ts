import { IAccessionRVConfig } from '../interfaces';

// Fichier de configuration par défaut de l'application
export const defaultConfig: IAccessionRVConfig = {
    // Section valeurs par défaut pour les connexion aux sources de données
    defaultDataDriver: {
        SpoDirect: {
            dataProtocol: 'sql',
            options: {
                client: 'mssql',
                // connection: {
                //     server: 'POS0233',
                //     user: 'sa',
                //     password: 'Asc!@37',
                //     database: 'Accession',
                //     options: {
                //         encrypt: false,
                //         instanceName: 'SAL2017'
                //     }
                // }
            }
        },
        // RefTiers: {
        //     dataUrl: 'http://localhost:8080/TiersProxy/referentiel-tiers/{$mem.tenant}',
        //     // dataProtocol: 'odata',
        //     // contains: 'substringof',
        //     // array: true,
        //     extraHeaders: {
        //         Authorization: '{$cookie.authHeader}',
        //         Accept: 'application/json'
        //     }
        // }
    },
    CMIS: {
        url: 'http://sercentos1:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser',
        extraHeaders: {
            authentication: 'admin:admin'
        }
    },
    DocMerge: {
        url: 'http://localhost/DocMerge'
    },
    // Surcharges par tenant (cookie "tenant")
    // tenants: {
    //     spo: {
    //         Accession: {
    //             tenantId: '1'
    //         }
    //     },
    //     spo1: {
    //         Accession: {
    //             dataUrl: 'http://sermilappaq/MDR',
    //             dataNamespace: 'AccessionRV',
    //             tenantId: '1'
    //         },
    //         SPO: {
    //             dataUrl: 'http://sermilappaq/SPO/odata'
    //         },
    //         SpoDirect: {
    //             // options: {
    //             //     client: 'mssql',
    //             //     connection: {
    //             //         server: 'localhost',
    //             //         database: 'test01',
    //             //         user: 'admin',
    //             //         password: 'admin',
    //             //         options: {
    //             //             encrypt: false,
    //             //             instanceName: 'SQLEXPRESS'
    //             //         }
    //             //     }
    //             // }
    //         }

    //     }
    // },
    // Section des options du middleware de session
    session: {
        timeOut: 20 * 60, // durée de vie maximale d'une session après le dernier accès en seconde
        clearInterval: 3 * 60, // interval de temps entre deux nettoyages de sessions perimées en seconde
        cookieName: 'Accession' // nom du cookie utilisé pour déterminer le nom de la session utilisée par une requête
    },
    // Section des options logging
    log: {
        stackTrace: false, // oui ou non pour le log de la pile d'exécution
        requestProperties: [ // propriétés à logger de la requête en plus de url et methode si erreur ou level: verbose
            'body',
            'cookies',
            'headers'
        ],
        level: 'error' // niveau de log ('error' | 'info' | 'verbose' | 'debug' | 'silly' | 'none'), none = sans logs
        // logDirectory: répértoire pour le fichier log, par défaut 'logs'
        // logFileName: nom du fichier log, par défaut 'accession-logs'
    },
    version: {
        checkVersion: false, // oui ou non pour vérifier la compatibilité avec la version du mdr
        entityName: 'RVDossier' // entité utilisé pour obtenir la version du mdr
    },
    useGED: true, // oui ou non pour utiliser le MINI-GED intégré
    gedStoragePath: './documents', // storage path when integrated ged is used
    useCMIS: true, // oui ou non pour utiliser un GED
    useDocMerge: true, // oui ou non pour utiliser DocMerge
    useGIS: true, // oui ou non pour utiliser la géolocalisation
    simuSPO: false, // oui ou non pour utiliser le simulateur SPO
    searchTasksInterval: 60, // interval de recherche des tâches planifiés
    optimisation: {
        noWiredRules: true, // oui pour ne pas cabler les règles
    },
    pathAccessionUX: '../AccessionUX/',
    ignoreCertificateErrors: true,
    defaultCulture: 'fr-fr',
    apiConfig: {
        doNotSetCookieOnLogin: false,
    },
    baseUrl: 'http://localhost'
};
