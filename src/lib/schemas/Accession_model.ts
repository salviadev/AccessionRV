/* tslint:disable */
export const model: any = {
    "CAGroupeUti": {
        "type": "object",
        "name": "CAGroupeUti",
        "description": "contrôle accès - groupe utilisateurs",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string",
                "title": "libellé"
            },
            "actif": {
                "type": "boolean"
            },
            "isAdmin": {
                "type": "boolean"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "relations": {
            "acces": {
                "type": "hasMany",
                "model": "CAGroupeUtiAcces",
                "aggregationKind": "composite",
                "invRel": "parentObject",
                "title": "acces",
                "invType": "belongsTo",
                "localFields": [
                    "id"
                ],
                "foreignFields": [
                    "parentId"
                ]
            }
        },
        "meta": {},
        "$mdr": true
    },
    "CAGroupeUtiMembre": {
        "type": "object",
        "name": "CAGroupeUtiMembre",
        "description": "membres du groupe",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string",
                "title": "libellé"
            },
            "refGroupe": {
                "type": "string",
                "format": "code"
            },
            "refUti": {
                "type": "string",
                "format": "code"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "indexes": [
            {
                "fields": [
                    "refUti",
                    "refGroupe"
                ],
                "unique": true
            },
            {
                "fields": "refGroupe"
            }
        ],
        "relations": {
            "groupe": {
                "model": "CAGroupeUti",
                "aggregationKind": "none",
                "localFields": [
                    "refGroupe"
                ],
                "foreignFields": [
                    "code"
                ],
                "type": "hasOne",
                "title": "groupe"
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {},
        "$mdr": true
    },
    "CARole": {
        "type": "object",
        "name": "CARole",
        "description": "contrôle accès - rôle",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string",
                "title": "libellé"
            },
            "actif": {
                "type": "boolean"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "relations": {
            "habilitations": {
                "type": "hasMany",
                "model": "CARoleHabil",
                "aggregationKind": "composite",
                "invRel": "parentObject",
                "title": "habilitations",
                "invType": "belongsTo",
                "localFields": [
                    "id"
                ],
                "foreignFields": [
                    "parentId"
                ]
            }
        },
        "meta": {},
        "$mdr": true
    },
    "CAUniteOrga": {
        "type": "object",
        "name": "CAUniteOrga",
        "description": "contrôle accès - unité organisation",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string",
                "title": "libellé"
            },
            "libLong": {
                "type": "string"
            },
            "actif": {
                "type": "boolean"
            },
            "refParent": {
                "type": "string",
                "format": "code"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "indexes": [
            {
                "fields": "refParent"
            }
        ],
        "relations": {
            "parent": {
                "model": "CAUniteOrga",
                "aggregationKind": "none",
                "localFields": [
                    "refParent"
                ],
                "foreignFields": [
                    "code"
                ],
                "type": "hasOne",
                "title": "parent"
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {},
        "$mdr": true
    },
    "GedDocument": {
        "name": "GedDocument",
        "type": "object",
        "title": "GED Document",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string"
            },
            "dateCreation": {
                "type": "string",
                "format": "date-time",
                "title": "date création"
            },
            "dateModif": {
                "type": "string",
                "format": "date-time",
                "title": "date dernière modification"
            },
            "commentaire": {
                "type": "string",
                "format": "memo"
            },
            "proprietaire": {
                "type": "string"
            },
            "classement": {
                "type": "string",
                "description": "Dossier1/Dossier2/Dossier3"
            },
            "typeDoc": {
                "type": "string"
            },
            "tailleFichier": {
                "type": "integer",
                "format": "int64",
                "description": "taille en octet"
            },
            "refFichier": {
                "type": "string",
                "description": "uid|http://xxxx|file://xxxx|chemin_relatif"
            },
            "stockage": {
                "type": "string",
                "format": "code",
                "description": "nom du config du stockage"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "relations": {
            "refs": {
                "type": "hasMany",
                "model": "GedDocumentReference",
                "aggregationKind": "composite",
                "invRel": "parentObject",
                "title": "refs",
                "invType": "belongsTo",
                "localFields": [
                    "id"
                ],
                "foreignFields": [
                    "parentId"
                ]
            }
        },
        "meta": {},
        "$mdr": true
    },
    "GedFichier": {
        "name": "GedFichier",
        "type": "object",
        "primaryKey": [
            "id"
        ],
        "title": "GED Fichier",
        "properties": {
            "code": {
                "type": "string",
                "format": "code",
                "title": "Url"
            },
            "nomFichier": {
                "type": "string"
            },
            "typeFichier": {
                "type": "string"
            },
            "tailleFichier": {
                "type": "integer",
                "format": "int64",
                "description": "taille en octet"
            },
            "dataFichier": {
                "type": "string",
                "format": "stream"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {},
        "$mdr": true
    },
    "SpoPreference": {
        "type": "object",
        "name": "SpoPreference",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string"
            },
            "classe": {
                "type": "string",
                "format": "code"
            },
            "util": {
                "type": "string"
            },
            "prive": {
                "type": "boolean"
            },
            "valeur": {
                "type": "string",
                "format": "json"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "indexes": [
            {
                "fields": "util"
            },
            {
                "fields": "classe"
            }
        ],
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {},
        "$mdr": true
    },
    "Article": {
        "type": "object",
        "name": "Article",
        "description": "Article",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string"
            },
            "prix": {
                "type": "number",
                "format": "money"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {},
        "$mdr": true
    },
    "Facture": {
        "type": "object",
        "name": "Facture",
        "description": "Facture Client",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string"
            },
            "refTiers": {
                "type": "string",
                "format": "code"
            },
            "dtFact": {
                "type": "string",
                "format": "date"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "indexes": [
            {
                "fields": "refTiers"
            }
        ],
        "relations": {
            "tiers": {
                "model": "Tiers",
                "aggregationKind": "none",
                "localFields": [
                    "refTiers"
                ],
                "foreignFields": [
                    "code"
                ],
                "type": "hasOne",
                "title": "tiers"
            },
            "details": {
                "type": "hasMany",
                "model": "FactureDetail",
                "aggregationKind": "composite",
                "invRel": "parentObject",
                "title": "details",
                "invType": "belongsTo",
                "localFields": [
                    "id"
                ],
                "foreignFields": [
                    "parentId"
                ]
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {},
        "$mdr": true
    },
    "Tiers": {
        "type": "object",
        "name": "Tiers",
        "description": "Tiers",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {},
        "$mdr": true
    },
    "CAGroupeUtiAcces": {
        "type": "object",
        "name": "CAGroupeUtiAcces",
        "description": "rôles par groupe",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string",
                "title": "libellé"
            },
            "refRole": {
                "type": "string",
                "format": "code"
            },
            "refUniteOrga": {
                "type": "string",
                "format": "code"
            },
            "parentId": {
                "type": "integer"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "indexes": [
            {
                "fields": [
                    "refRole",
                    "refUniteOrga",
                    "parentId"
                ],
                "unique": true
            },
            {
                "fields": "refUniteOrga"
            }
        ],
        "relations": {
            "role": {
                "model": "CARole",
                "aggregationKind": "none",
                "localFields": [
                    "refRole"
                ],
                "foreignFields": [
                    "code"
                ],
                "type": "hasOne",
                "title": "role"
            },
            "uniteOrga": {
                "model": "CAUniteOrga",
                "aggregationKind": "none",
                "localFields": [
                    "refUniteOrga"
                ],
                "foreignFields": [
                    "code"
                ],
                "type": "hasOne",
                "title": "uniteOrga"
            },
            "parentObject": {
                "type": "belongsTo",
                "model": "CAGroupeUti",
                "aggregationKind": "composite",
                "invRel": "acces",
                "title": "parentObject",
                "invType": "hasMany",
                "foreignFields": [
                    "id"
                ],
                "localFields": [
                    "parentId"
                ]
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {
            "parent": "CAGroupeUti",
            "parentRelation": "parentObject"
        },
        "$mdr": true
    },
    "CARoleHabil": {
        "type": "object",
        "name": "CARoleHabil",
        "description": "habilitations par rôle",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string",
                "title": "libellé"
            },
            "action": {
                "type": "string",
                "format": "code"
            },
            "niveau": {
                "type": "string",
                "format": "code"
            },
            "parentId": {
                "type": "integer"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "indexes": [
            {
                "fields": [
                    "action",
                    "parentId"
                ],
                "unique": true
            }
        ],
        "relations": {
            "parentObject": {
                "type": "belongsTo",
                "model": "CARole",
                "aggregationKind": "composite",
                "invRel": "habilitations",
                "title": "parentObject",
                "invType": "hasMany",
                "foreignFields": [
                    "id"
                ],
                "localFields": [
                    "parentId"
                ]
            }
        },
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {
            "parent": "CARole",
            "parentRelation": "parentObject"
        },
        "$mdr": true
    },
    "GedDocumentReference": {
        "name": "GedDocumentReference",
        "type": "object",
        "properties": {
            "ref0": {
                "type": "string"
            },
            "ref1": {
                "type": "string"
            },
            "ref2": {
                "type": "string"
            },
            "ref3": {
                "type": "string"
            },
            "ref4": {
                "type": "string"
            },
            "ref5": {
                "type": "string"
            },
            "ref6": {
                "type": "string"
            },
            "ref7": {
                "type": "string"
            },
            "ref8": {
                "type": "string"
            },
            "ref9": {
                "type": "string"
            },
            "ref10": {
                "type": "string"
            },
            "ref11": {
                "type": "string"
            },
            "ref12": {
                "type": "string"
            },
            "ref13": {
                "type": "string"
            },
            "ref14": {
                "type": "string"
            },
            "ref15": {
                "type": "string"
            },
            "ref16": {
                "type": "string"
            },
            "ref17": {
                "type": "string"
            },
            "ref18": {
                "type": "string"
            },
            "ref19": {
                "type": "string"
            },
            "ref20": {
                "type": "string"
            },
            "parentId": {
                "type": "integer"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "relations": {
            "parentObject": {
                "type": "belongsTo",
                "model": "GedDocument",
                "aggregationKind": "composite",
                "invRel": "refs",
                "title": "parentObject",
                "invType": "hasMany",
                "foreignFields": [
                    "id"
                ],
                "localFields": [
                    "parentId"
                ]
            }
        },
        "_checked": true,
        "primaryKey": [
            "id"
        ],
        "meta": {
            "parent": "GedDocument",
            "parentRelation": "parentObject"
        },
        "$mdr": true
    },
    "FactureDetail": {
        "type": "object",
        "name": "FactureDetail",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "code": {
                "type": "string",
                "format": "code"
            },
            "libelle": {
                "type": "string"
            },
            "montant": {
                "type": "number",
                "format": "money"
            },
            "refArticle": {
                "type": "string",
                "format": "code"
            },
            "parentId": {
                "type": "integer"
            },
            "_dtm": {
                "type": "string",
                "format": "date-time",
                "isHidden": true
            },
            "id": {
                "type": "integer"
            }
        },
        "relations": {
            "article": {
                "model": "Article",
                "aggregationKind": "none",
                "localFields": [
                    "refArticle"
                ],
                "foreignFields": [
                    "code"
                ],
                "type": "hasOne",
                "title": "article"
            },
            "parentObject": {
                "type": "belongsTo",
                "model": "Facture",
                "aggregationKind": "composite",
                "invRel": "details",
                "title": "parentObject",
                "invType": "hasMany",
                "foreignFields": [
                    "id"
                ],
                "localFields": [
                    "parentId"
                ]
            }
        },
        "indexes": [
            {
                "fields": "refArticle"
            }
        ],
        "_checked": true,
        "businessKey": [
            "code"
        ],
        "meta": {
            "parent": "Facture",
            "parentRelation": "parentObject"
        },
        "$mdr": true
    }
};