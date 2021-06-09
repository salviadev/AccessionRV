// Fichier de configuration utilisateur dev de l'application
module.exports = {
    // Section valeurs par défaut pour les connexion aux sources de données
    defaultDataDriver: {
        SpoDirect: {
            dataProtocol: 'sql',
            options: {
                client: 'mssql',
                log: true,
                connection: {
                    server: 'localhost\\SQLEXPRESS',
                    // server: '51.103.43.207', // WIN2019-SPOTEST: serveur qualité
                    
                    user: 'sage',
                    password: 'sage',
                    // database: 'SPOB_V17_BAILLEUR',
                    // database: 'SPO_PROD',
                    database: 'SPOP_V17_PROMOTEUR',
                    database: 'SPOP_V17_PROMOTEUR',
                    database: 'IILKIRCH_SPO',
                    database: 'SPOP_V17.1_PROMOTEUR',
                    // database: 'SPO_ALSEI',
                    // database: 'SPO_ALSEI_PROD',
                    options: {
                        encrypt: false,
                        // instanceName: 'SQLEXPRESS'
                    }
                }
            }
        }
    },

    DocMerge: {
        url: 'http://localhost/DocMerge'
    },
    // Surcharges par tenant (cookie "tenant")
    // tenants: {
    //     spo: {
    //         spoUrl: 'http://sermilappaq/SPO',
    //     },
    //     spo1: {
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
    // Section des options du middleware qui logge des erreurs http
    log: {
        stackTrace: false, // oui ou non pour le log de la pile d'exécution
        requestProperties: [ // propriétés à logger de la requête en plus de url et de la methode
            'body',
            'cookies',
            'headers'
        ],
        level: 'error' // niveau de log ('error' | 'info' | 'verbose' | 'debug' | 'silly' | 'none'), none=sans logs
        // logDirectory: répértoire pour le fichier log, par défaut 'logs'
        // logFileName: nom du fichier log, par défaut 'accession-logs'

    },
    // Section des options du middleware de session
    // session: {
    //     timeOut: 20 * 60, // durée de vie maximale d'une session après le dernier accès en seconde
    //     clearInterval: 3 * 60, // interval de temps entre deux nettoyages de sessions perimées en seconde
    // },
    version: {
        checkVersion: false, // oui ou non pour vérifier la compatibilité avec la version du mdr
        entityName: 'RVDossier' // entité utilisé pour obtenir la version du mdr
    },
    useGED: true, // oui ou non pour utiliser le MINI-GED intégré
    gedStoragePath: './documents', // storage path wheb integrated ged is used
    useCMIS: false, // oui ou non pour utiliser un GED
    useDocMerge: false, // oui ou non pour utiliser DocMerge
    simuSPO: true, // oui ou non pour utiliser le simulateur SPO
    resourcesFolder: './documents', // Repertoire ou se trouvent les images coresponde à "MGDIS:N03:Repertoire Fusions" de SPO
    useRights: true,  // Activation des droits
    userId: 'ADMCLI', // Default user Id
    profId: 'ADMCLI', // Default profile Id
    // userId: '00000005',
    serverTiers: {
        host: null,
        tenant: null,
        authorization: null,
    },
    useInseeData: true,
    baseUrl: 'http://localhost/',
    spoUrl: 'http://localhost/GizehDev/',
    serverTimeout: undefined,
}
