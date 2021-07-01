/* tslint:disable */
export const model: any = {
    "SpoPBPoste": {
        "tableName": "PBPOSTE",
        "name": "SpoPBPoste",
        "title": "Poste budget",
        "type": "object",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "id": {
                "title": "Code",
                "type": "string",
                "maxLength": 32
            },
            "lib": {
                "title": "Libellé",
                "type": "string",
                "maxLength": 200
            },
            "cmnt": {
                "title": "Commentaire",
                "type": "string",
                "maxLength": 4000,
                "format": "memo"
            },
            "pos": {
                "title": "Position",
                "type": "string",
                "maxLength": 32
            },
            "niveau": {
                "title": "Niveau hiérarchique",
                "type": "integer"
            },
            "typstruct": {
                "title": "Type structure",
                "type": "string",
                "enum": [
                    "R",
                    "D",
                    "M"
                ],
                "enumNames": [
                    "Recette",
                    "Dépense",
                    "Marge"
                ],
                "maxLength": 10
            },
            "idpere": {
                "title": "Parent",
                "type": "string",
                "maxLength": 32
            },
            "soc": {
                "title": "Code société",
                "type": "string",
                "maxLength": 32
            },
            "codegf": {
                "title": "Code poste GF",
                "type": "string",
                "maxLength": 50
            },
            "codesmo": {
                "title": "Code SMO",
                "type": "string",
                "maxLength": 50
            },
            "carac": {
                "title": "Caractéristique",
                "type": "string",
                "maxLength": 10
            },
            "defaut": {
                "title": "Est par défaut  (O/N)",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "nosaisie": {
                "title": "Interdire la saisie (O/N)",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "moderpt": {
                "title": "Mode répartition",
                "type": "string",
                "maxLength": 10
            },
            "moderpttr": {
                "title": "Mode répartition Tranche",
                "type": "string",
                "maxLength": 10
            },
            "info": {
                "title": "Information",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "modelebudget": {
                "title": "ModeleBudget",
                "type": "string",
                "maxLength": 32
            },
            "identmodelebudget": {
                "title": "IdentiqueModeleBudget",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "inclustvamarge": {
                "title": "inclusTvaMarge",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "colaxe": {
                "title": "colAxe",
                "type": "string",
                "maxLength": 32
            }
        },
        "meta": {}
    },
    "SpoProgramme": {
        "tableName": "PROG",
        "name": "SpoProgramme",
        "title": "Programme",
        "type": "object",
        "primaryKey": [
            "id"
        ],
        "properties": {
            "id": {
                "title": "Code",
                "type": "string",
                "maxLength": 32
            },
            "lib": {
                "title": "Libellé",
                "type": "string",
                "maxLength": 200
            },
            "idop": {
                "title": "Code opération",
                "type": "string",
                "maxLength": 32
            },
            "cmnt": {
                "title": "Commentaire",
                "type": "string",
                "maxLength": 4000,
                "format": "memo"
            },
            "codegf": {
                "title": "Code programme GF",
                "type": "string",
                "maxLength": 50
            },
            "codesmo": {
                "title": "Code SMO",
                "type": "string",
                "maxLength": 50
            },
            "activite": {
                "title": "Activite",
                "type": "string",
                "maxLength": 10
            },
            "natrv": {
                "title": "Nature de travaux",
                "type": "string",
                "maxLength": 10
            },
            "typeprog": {
                "title": "Type programme",
                "type": "string",
                "maxLength": 10
            },
            "typfin": {
                "title": "Type financement",
                "type": "string",
                "maxLength": 10
            },
            "typouv": {
                "title": "Type ouvrage",
                "type": "string",
                "maxLength": 10
            },
            "regfisc": {
                "title": "Régime fiscal",
                "type": "string",
                "maxLength": 32
            },
            "nivliv": {
                "title": "Niveau de livraison",
                "type": "string",
                "maxLength": 10
            },
            "modinterv": {
                "title": "Mode intervention",
                "type": "string",
                "maxLength": 10
            },
            "finorig": {
                "title": "Financement origine",
                "type": "string",
                "maxLength": 20
            },
            "csa": {
                "title": "Construction sur sol autrui (O/N)",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "annee": {
                "title": "Annee",
                "type": "integer"
            },
            "etape": {
                "title": "Etape Budgétaire",
                "type": "string",
                "maxLength": 10
            },
            "csd": {
                "title": "Création secteur distinct",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "clerepart": {
                "title": "Clé de répartition",
                "type": "number",
                "decimals": 2
            },
            "structure": {
                "title": "Structure",
                "type": "string",
                "maxLength": 10
            },
            "datecsd": {
                "title": "Date",
                "type": "string",
                "format": "mgdis-date"
            },
            "tranchetravaux": {
                "title": "Identifant tranche travaux",
                "type": "string",
                "maxLength": 32
            },
            "naturetype": {
                "title": "Identifiant Nature - type ouvrage",
                "type": "string",
                "maxLength": 32
            },
            "typecomm": {
                "title": "TypeComm",
                "type": "string",
                "maxLength": 10
            },
            "tauxtva": {
                "title": "Taux de TVA",
                "type": "number",
                "decimals": 2
            },
            "statut": {
                "title": "Statut",
                "type": "string",
                "maxLength": 10
            },
            "postebudvente": {
                "title": "Poste budgétaire de vente",
                "type": "string",
                "maxLength": 32
            },
            "esttranche": {
                "title": "EstTranche",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "nomcom": {
                "title": "Nom commercial",
                "type": "string",
                "maxLength": 100
            },
            "existegp": {
                "title": "ExisteGP",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "surfbrute": {
                "title": "SurfBrute",
                "type": "number",
                "decimals": 4
            },
            "surfvendu": {
                "title": "SurfVendu",
                "type": "number",
                "decimals": 4
            },
            "ratiosurfvb": {
                "title": "RatioSurfVB",
                "type": "number",
                "decimals": 4
            },
            "dation": {
                "title": "Dation",
                "type": "boolean",
                "format": "mgdis-boolean"
            },
            "optiontva": {
                "title": "optionTva",
                "type": "string",
                "format": "code",
                "maxLength": 10,
                "enum": [
                    "TC",
                    "TMI",
                    "TM"
                ],
                "enumNames": [
                    "TVA classique",
                    "TVA sur marge inclus",
                    "TVA sur marge non inclus"
                ]
            },
            "repartvamarge": {
                "title": "reparTvaMarge",
                "type": "string",
                "maxLength": 10
            },
            "postetvamarge": {
                "title": "posteTvaMarge",
                "type": "string",
                "maxLength": 32
            },
            "idproced": {
                "title": "idProced",
                "type": "string",
                "maxLength": 32
            },
            "postedation": {
                "title": "PosteDation",
                "type": "string",
                "maxLength": 32
            },
            "idinitial": {
                "title": "idInitial",
                "type": "string",
                "maxLength": 32
            },
            "idreference": {
                "title": "idreference",
                "type": "string",
                "maxLength": 32
            },
            "methodetvamarge": {
                "title": "Methodd TVA sur Marge",
                "type": "string",
                "maxLength": 32
            }
        },
        "meta": {}
    }
};