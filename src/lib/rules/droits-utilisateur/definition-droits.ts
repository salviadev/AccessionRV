import * as boc from '@phoenix/boc';
export interface IDrModule {
    code: string;
    action?: string;
    fonction?: string;
    module: string;
    moduleCode?: string;
}

export interface IRightValues {
    [code: string]: string;
}

export interface IOpUserRights {
    roles: string[];
    rightValues: IRightValues;
    isAdmin?: boolean;
}
export interface IUserRights {
    isAdmin?: boolean;
    rightsByOp: Map<string, IOpUserRights>;
}

const droits: IDrModule[] = [
    {
        module: 'OP',
        fonction: 'OP',
        code: 'OP'
    },
    {
        module: 'OP',
        fonction: 'OP',
        code: 'OP_NEW',
        action: 'OP_NEW'
    },
    {
        module: 'OP',
        fonction: 'OP',
        code: 'OP_MODBUD',
        action: 'OP_MODBUD'
    },
    {
        module: 'OP',
        fonction: 'OP',
        code: 'OP_DEL',
        action: 'OP_DEL'
    },
    {
        module: 'OP',
        fonction: 'OP',
        code: 'OP_OP_REPLACE_PROCEL',
        action: 'OP_REPLACE_PROC'
    },
    {
        module: 'OP',
        fonction: 'OP_FON',
        code: 'OP_FON',
    },
    {
        module: 'OP',
        fonction: 'OP_FON',
        code: 'OP_FON_NEW',
        action: 'OP_FON_NEW'
    },
    {
        module: 'OP',
        fonction: 'OP_FON',
        code: 'OP_FON_DEL',
        action: 'OP_FON_DEL'
    },
    {
        module: 'OP',
        fonction: 'OP_FON',
        code: 'OP_FON_AB',
        action: 'OP_FON_AB'
    },
    {
        module: 'OP',
        fonction: 'OP_FON',
        code: 'OP_FON_NEW_PAR',
        action: 'OP_FON_NEW_PAR'
    },
    {
        module: 'OP',
        fonction: 'OP_FON',
        code: 'OP_FON_DEL_PAR',
        action: 'OP_FON_DEL_PAR'
    },
    {
        module: 'OP',
        fonction: 'OP_FON',
        code: 'OP_FON_NEW_PRO',
        action: 'OP_FON_NEW_PRO'
    },
    {
        module: 'OP',
        fonction: 'OP_FON',
        code: 'OP_FON_DEL_PRO',
        action: 'OP_FON_DEL_PRO'
    },
    {
        module: 'OP',
        fonction: 'OP_VER',
        code: 'OP_VER'
    },
    {
        module: 'OP',
        fonction: 'OP_VER',
        action: 'OP_VER_NEW',
        code: 'OP_VER_NEW'
    },
    {
        module: 'OP',
        fonction: 'OP_VER',
        action: 'OP_VER_DEL',
        code: 'OP_VER_DEL'
    },
    {
        module: 'OP',
        fonction: 'OP_VER',
        action: 'OP_VER_ARCH',
        code: 'OP_VER_ARCH'
    },
    {
        module: 'OP',
        fonction: 'OP_VER',
        action: 'OP_VER_TYPE',
        code: 'OP_VER_TYPE'
    },
    {
        module: 'OP',
        fonction: 'OP_VER',
        action: 'OP_VER_LIB',
        code: 'OP_VER_LIB'
    },
    {
        module: 'OP',
        fonction: 'OP_VER',
        action: 'OP_VER_STATUT',
        code: 'OP_VER_STATUT'
    },
    {
        module: 'OP',
        fonction: 'OP_VER',
        action: 'OP_VER_DATE',
        code: 'OP_VER_DATE'
    },
    {
        module: 'OP',
        fonction: 'OP_VER',
        action: 'OP_VER_CMNT',
        code: 'OP_VER_CMNT'
    },
    {
        module: 'OP',
        fonction: 'OP_TT',
        code: 'OP_TT'
    },
    {
        module: 'OP',
        fonction: 'OP_TT',
        code: 'OP_TT_NEW',
        action: 'OP_TT_NEW'
    },
    {
        module: 'OP',
        fonction: 'OP_TT',
        action: 'OP_TT_DEL',
        code: 'OP_TT_DEL'
    },
    {
        module: 'OP',
        fonction: 'OP_TT',
        action: 'OP_TT_STATUT',
        code: 'OP_TT_STATUT'
    },
    {
        module: 'OP',
        fonction: 'OP_TC',
        code: 'OP_TC',
    },
    {
        module: 'OP',
        fonction: 'OP_TC',
        code: 'OP_TC_NEW',
        action: 'OP_TC_NEW'
    },
    {
        module: 'OP',
        fonction: 'OP_TC',
        code: 'OP_TC_DEL',
        action: 'OP_TC_DEL'
    },
    {
        module: 'OP',
        fonction: 'OP_TC',
        action: 'OP_TC_ECH',
        code: 'OP_TC_ECH'
    },
    {
        module: 'OP',
        fonction: 'OP_TC',
        action: 'OP_TC_AIDE',
        code: 'OP_TC_AIDE'
    },
    {
        module: 'OP',
        fonction: 'OP_TC',
        action: 'OP_TC_TM',
        code: 'OP_TC_TM'
    },
    {
        module: 'OP',
        fonction: 'OP_TC',
        action: 'OP_TC_GP',
        code: 'OP_TC_GP'
    },
    {
        module: 'OP',
        fonction: 'OP_TC',
        action: 'OP_TC_DGP',
        code: 'OP_TC_DGP'
    },
    {
        module: 'OP',
        fonction: 'OP_TL',
        code: 'OP_TL',
    },
    {
        module: 'OP',
        fonction: 'OP_TL',
        action: 'OP_TL_NEW',
        code: 'OP_TL_NEW'
    },
    {
        module: 'OP',
        fonction: 'OP_TL',
        action: 'OP_TL_DEL',
        code: 'OP_TL_DEL'
    },
    {
        module: 'OP',
        fonction: 'OP_PROC',
        code: 'OP_PROC'
    },
    {
        module: 'OP',
        fonction: 'OP_PROC',
        action: 'OP_PROC_ACT_DEL',
        code: 'OP_PROC_ACT_DEL'
    },
    {
        module: 'OP',
        fonction: 'OP_PROC',
        action: 'OP_PROC_ACT_RENAME',
        code: 'OP_PROC_ACT_RENAME'
    },
    {
        module: 'OP',
        fonction: 'OP_PROC',
        action: 'OP_PROC_ETP',
        code: 'OP_PROC_ETP'
    },
    {
        module: 'OP',
        fonction: 'OP_PROC',
        action: 'OP_PROC_COMM',
        code: 'OP_PROC_COMM'
    },
    {
        module: 'OP',
        fonction: 'OP_GANTT',
        code: 'OP_GANTT',
    },
    {
        module: 'OP',
        fonction: 'OP_GANTT',
        action: 'OP_GANTT_EXP',
        code: 'OP_GANTT_EXP'
    },
    {
        module: 'OP',
        fonction: 'OP_ACTR',
        code: 'OP_ACTR'
    },
    {
        module: 'OP',
        fonction: 'OP_ACTR',
        action: 'OP_ACTR_ADD',
        code: 'OP_ACTR_ADD'
    },
    {
        module: 'OP',
        fonction: 'OP_ACTR',
        action: 'OP_ACTR_DEL',
        code: 'OP_ACTR_DEL'
    },
    {
        module: 'OP',
        fonction: 'OP_BUD',
        code: 'OP_BUD',
    },
    {
        module: 'OP',
        fonction: 'OP_BUD',
        code: 'OP_BUD_NEW',
        action: 'OP_BUD_NEW'
    },
    {
        module: 'OP',
        fonction: 'OP_BUD',
        code: 'OP_BUD_DEL',
        action: 'OP_BUD_DEL'
    },
    {
        module: 'OP',
        fonction: 'OP_BUD',
        code: 'OP_BUD_AUT_VERR',
        action: 'OP_BUD_AUT_VERR'
    },
    {
        module: 'OP',
        fonction: 'OP_BUD',
        action: 'OP_BUD_EXP',
        code: 'OP_BUD_EXP'
    },
    {
        module: 'OP',
        fonction: 'OP_BUD',
        code: 'OP_BUD_CALC',
        action: 'OP_BUD_CALC'
    },
    {
        module: 'OP',
        fonction: 'OP_SBUD',
        code: 'OP_SBUD',
    },
    {
        module: 'OP',
        fonction: 'OP_COMM',
        code: 'OP_COMM'
    },
    {
        module: 'OP',
        fonction: 'OP_TRESO',
        code: 'OP_TRESO'
    },
    {
        module: 'OP',
        fonction: 'OP_TRESO',
        action: 'OP_TRESO_SAVE',
        code: 'OP_TRESO_SAVE'
    },
    {
        module: 'OP',
        fonction: 'OP_REAFBUD',
        code: 'OP_REAFBUD'
    },
    {
        module: 'OP',
        fonction: 'OP_EDIT',
        code: 'OP_EDIT'
    },
    {
        module: 'OP',
        fonction: 'OP_EDIT',
        action: 'OP_EDIT_DL',
        code: 'OP_EDIT_DL'
    },
    {
        module: 'OP',
        fonction: 'OP_EDIT',
        action: 'OP_EDIT_EDITMOD',
        code: 'OP_EDIT_EDITMOD'
    },
    {
        module: 'OP',
        fonction: 'OP_DOC_JOIN',
        code: 'OP_DOC_JOIN'
    },
    {
        module: 'OP',
        fonction: 'OP_DOC_JOIN',
        action: 'OP_DOC_JOIN_DL',
        code: 'OP_DOC_JOIN_DL'
    },
    {
        module: 'OP',
        fonction: 'OP_DOC_JOIN',
        action: 'OP_DOC_JOIN_NEW',
        code: 'OP_DOC_JOIN_NEW'
    },
    {
        module: 'OP',
        fonction: 'OP_DOC_JOIN',
        action: 'OP_DOC_JOIN_MOD',
        code: 'OP_DOC_JOIN_MOD'
    },
    {
        module: 'OP',
        fonction: 'OP_DOC_JOIN',
        action: 'OP_DOC_JOIN_DEL',
        code: 'OP_DOC_JOIN_DEL'
    },
    {
        module: 'SOC',
        fonction: 'SOC',
        code: 'SOC',
    },
    {
        module: 'SOC',
        fonction: 'SOC',
        action: 'SOC_NEW',
        code: 'SOC_NEW'
    },
    {
        module: 'SOC',
        fonction: 'SOC',
        action: 'SOC_DEL',
        code: 'SOC_DEL'
    },
    {
        module: 'SOC',
        fonction: 'SOC',
        action: 'SOC_OP',
        code: 'SOC_OP'
    },
    {
        module: 'SOC',
        fonction: 'SOC_EXE',
        code: 'SOC_EXE'
    },
    {
        module: 'SOC',
        fonction: 'SOC_EXE',
        action: 'SOC_EXE_NEW',
        code: 'SOC_EXE_NEW'
    },
    {
        module: 'SOC',
        fonction: 'SOC_EXE',
        action: 'SOC_EXE_DEL',
        code: 'SOC_EXE_DEL'
    },
    {
        module: 'SOC',
        fonction: 'SOC_EXE',
        action: 'SOC_EXE_CLOT',
        code: 'SOC_EXE_CLOT'
    },
    {
        module: 'SOC',
        fonction: 'SOC_EXE',
        action: 'SOC_EXE_DECLOT',
        code: 'SOC_EXE_DECLOT'
    },
    {
        module: 'SOC',
        fonction: 'SOC_PERIM',
        code: 'SOC_PERIM'
    },
    {
        module: 'SOC',
        fonction: 'SOC_FFI',
        code: 'SOC_FFI',
    },
    {
        module: 'SOC',
        fonction: 'SOC_EXPCPT',
        code: 'MC_EXPCPT'
    },
    {
        module: 'SOC',
        fonction: 'SOC_FLUXFI',
        code: 'SOC_FLUXFI'
    },
    {
        module: 'SOC',
        fonction: 'SOC_FLUXFI',
        action: 'SOC_FLUXFI_NEW',
        code: 'SOC_FLUXFI_NEW'
    },
    {
        module: 'SOC',
        fonction: 'SOC_FLUXFI',
        action: 'SOC_FLUXFI_DEL',
        code: 'SOC_FLUXFI_DEL'
    },
    {
        module: 'SOC',
        fonction: 'SOC_CB',
        code: 'SOC_CB'
    },
    {
        module: 'SOC',
        fonction: 'SOC_CB',
        action: 'SOC_CB_NEW',
        code: 'SOC_CB_NEW'
    },
    {
        module: 'SOC',
        fonction: 'SOC_CB',
        action: 'SOC_CB_NEWOP',
        code: 'SOC_CB_NEWOP'
    },
    {
        module: 'SOC',
        fonction: 'SOC_CB',
        action: 'SOC_CB_DEL',
        code: 'SOC_CB_DEL'
    },
    {
        module: 'SOC',
        fonction: 'SOC_OP',
        code: 'SOC_OP'
    },
    {
        module: 'SOC',
        fonction: 'SOC_OP',
        code: 'SOC_OP_TRANSF',
        action: 'SOC_OP_TRANSF'
    },
    {
        module: 'SOC',
        fonction: 'SOC_OPACH',
        code: 'SOC_OPACH'
    },
    {
        module: 'SOC',
        fonction: 'SOC_OPACH',
        action: 'SOC_OPACH_NEW',
        code: 'SOC_OPACH_NEW'
    },
    {
        module: 'SOC',
        fonction: 'SOC_OPACH',
        action: 'SOC_OPACH_DEL',
        code: 'SOC_OPACH_DEL'
    },
    {
        module: 'SOC',
        fonction: 'SOC_OPACH',
        action: 'SOC_OPACH_CPT',
        code: 'SOC_OPACH_CPT'
    },
    {
        module: 'SOC',
        fonction: 'SOC_OPACH',
        action: 'SOC_OPACH_TRANSF',
        code: 'SOC_OPACH_TRANSF'
    },
    {
        module: 'SOC',
        fonction: 'SOC_OPACH',
        action: 'SOC_OPACH_DELCPT',
        code: 'SOC_OPACH_DELCPT'
    },
    // {
    //     module: 'SOC',
    //     fonction: 'SOC_OPTERM',
    //     code: 'SOC_OPTERM'
    // },
    // {
    //     module: 'SOC',
    //     fonction: 'SOC_IAC',
    //     code: 'SOC_IAC'
    // },
    // {
    //     module: 'SOC',
    //     fonction: 'SOC_MARGE',
    //     code: 'SOC_MARGE'
    // },
    // {
    //     module: 'SOC',
    //     fonction: 'SOC_IAV_REC',
    //     code: 'SOC_IAV_REC'
    // },
    // {
    //     module: 'SOC',
    //     fonction: 'SOC_IAV_FNP',
    //     code: 'SOC_IAV_FNP'
    // },
    // {
    //     module: 'SOC',
    //     fonction: 'SOC_IAV_CAL',
    //     code: 'SOC_IAV_CAL'
    // },
    {
        module: 'SOC',
        fonction: 'SOC_APAYER',
        code: 'SOC_APAYER'
    },
    {
        module: 'SOC',
        fonction: 'SOC_APAYER',
        action: 'SOC_APAYER_ADD_BLOC',
        code: 'SOC_APAYER_ADD_BLOC'
    },
    {
        module: 'SOC',
        fonction: 'SOC_APAYER',
        action: 'SOC_APAYER_DEL_BLOC',
        code: 'SOC_APAYER_DEL_BLOC'
    },
    {
        module: 'SOC',
        fonction: 'SOC_APAYER',
        action: 'SOC_APAYER_ADD_BON',
        code: 'SOC_APAYER_ADD_BON'
    },
    {
        module: 'SOC',
        fonction: 'SOC_APAYER',
        action: 'SOC_APAYER_DEL_BON',
        code: 'SOC_APAYER_DEL_BON'
    },
    {
        module: 'SOC',
        fonction: 'SOC_APAYER',
        action: 'SOC_APAYER_ADD_REG',
        code: 'SOC_APAYER_ADD_REG'
    },
    {
        module: 'SOC',
        fonction: 'SOC_APAYER',
        action: 'SOC_APAYER_DEL_REG',
        code: 'SOC_APAYER_DEL_REG'
    },
    {
        module: 'MC',
        fonction: 'MC',
        code: 'MC',
    },
    {
        module: 'MC',
        fonction: 'MC_BC',
        action: 'MC_BC_NEW',
        code: 'MC_BC_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_BC',
        action: 'MC_BC_IMPREVU',
        code: 'MC_BC_IMPREVU'
    },
    {
        module: 'MC',
        fonction: 'MC_BC',
        action: 'MC_BC_EDITION',
        code: 'MC_BC_EDITION'
    },
    {
        module: 'MC',
        fonction: 'MC_BC',
        action: 'MC_BC_ENG',
        code: 'MC_BC_ENG'
    },
    {
        module: 'MC',
        fonction: 'MC_BC',
        action: 'MC_BC_DESENG',
        code: 'MC_BC_DESENG'
    },
    {
        module: 'MC',
        fonction: 'MC_AVBC',
        action: 'MC_AVBC_ENG',
        code: 'MC_AVBC_ENG',
    },
    {
        module: 'MC',
        fonction: 'MC_AVBC',
        action: 'MC_AVBC_DESENG',
        code: 'MC_AVBC_DESENG',
    },
    {
        module: 'MC',
        fonction: 'MC_MAR',
        code: 'MC_MAR'
    },
    {
        module: 'MC',
        fonction: 'MC_MAR',
        action: 'MC_MAR_AUTOLIQ',
        code: 'MC_MAR_AUTOLIQ'
    },
    {
        module: 'MC',
        fonction: 'MC_TCE',
        action: 'MC_TCE_NEW',
        code: 'MC_TCE_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_TCE',
        action: 'MC_TCE_IMPREVU',
        code: 'MC_TCE_IMPREVU'
    },
    {
        module: 'MC',
        fonction: 'MC_TCE',
        action: 'MC_TCE_ENG',
        code: 'MC_TCE_ENG'
    },
    {
        module: 'MC',
        fonction: 'MC_TCE',
        action: 'MC_TCE_DESENG',
        code: 'MC_TCE_DESENG'
    },
    {
        module: 'MC',
        fonction: 'MC_MBC',
        code: 'MC_MBC_NEW',
        action: 'MC_MBC_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_PI',
        action: 'MC_PI_NEW',
        code: 'MC_PI_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_PI',
        action: 'MC_PI_IMPREVU',
        code: 'MC_PI_IMPREVU'
    },
    {
        module: 'MC',
        fonction: 'MC_PI',
        action: 'MC_PI_ENG',
        code: 'MC_PI_ENG'
    },
    {
        module: 'MC',
        fonction: 'MC_PI',
        action: 'MC_PI_DESENG',
        code: 'MC_PI_DESENG'
    },
    {
        module: 'MC',
        fonction: 'MC_CES',
        action: 'MC_CES_NEW',
        code: 'MC_CES_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_CES',
        action: 'MC_CES_IMPREVU',
        code: 'MC_CES_IMPREVU'
    },
    {
        module: 'MC',
        fonction: 'MC_CES',
        action: 'MC_CES_ENG',
        code: 'MC_CES_ENG'
    },
    {
        module: 'MC',
        fonction: 'MC_CES',
        action: 'MC_CES_DESENG',
        code: 'MC_CES_DESENG'
    },
    {
        module: 'MC',
        fonction: 'MC_ST',
        action: 'MC_ST_NEW',
        code: 'MC_ST_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_ST',
        action: 'MC_ST_ENG',
        code: 'MC_ST_ENG'
    },
    {
        module: 'MC',
        fonction: 'MC_AVN',
        action: 'MC_AVN_NEW',
        code: 'MC_AVN_NEW',
    },
    {
        module: 'MC',
        fonction: 'MC_AVN',
        action: 'MC_AVN_ENG',
        code: 'MC_AVN_ENG'
    },
    {
        module: 'MC',
        fonction: 'MC_AVN',
        action: 'MC_AVN_DESENG',
        code: 'MC_AVN_DESENG'
    },
    {
        module: 'MC',
        fonction: 'MC_CAUT',
        code: 'MC_CAUT'
    },
    {
        module: 'MC',
        fonction: 'MC_DP',
        code: 'MC_DP'
    },
    {
        module: 'MC',
        fonction: 'MC_FAC',
        code: 'MC_FAC'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        code: 'MC_FACD'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        action: 'MC_FACD_NEW',
        code: 'MC_FACD_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        action: 'MC_FACD_ANN',
        code: 'MC_FACD_ANN'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        action: 'MC_FACD_DEL',
        code: 'MC_FACD_DEL'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        action: 'MC_FAC_PR',
        code: 'MC_FAC_PR'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        action: 'MC_FAC_PUC',
        code: 'MC_FAC_PUC'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        action: 'MC_FAC_IE',
        code: 'MC_FAC_IE'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        action: 'MC_FAC_MULTX',
        code: 'MC_FAC_MULTX'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        action: 'MC_FAC_TMU',
        code: 'MC_FAC_TMU'
    },
    {
        module: 'MC',
        fonction: 'MC_FACD',
        action: 'MC_FAC_IMPREVU',
        code: 'MC_FAC_IMPREVU'
    },
    {
        module: 'MC',
        fonction: 'MC_FBC',
        action: 'MC_FBC_NEW',
        code: 'MC_FBC_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_FBC',
        action: 'MC_FBC_ANN',
        code: 'MC_FBC_ANN'
    },
    {
        module: 'MC',
        fonction: 'MC_FBC',
        action: 'MC_FBC_DEL',
        code: 'MC_FBC_DEL'
    },
    {
        module: 'MC',
        fonction: 'MC_SIT',
        code: 'MC_SIT'
    },
    {
        module: 'MC',
        fonction: 'MC_SIT',
        action: 'MC_SIT_NEW',
        code: 'MC_SIT_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_SIT',
        action: 'MC_SIT_AC',
        code: 'MC_SIT_AC'
    },
    {
        module: 'MC',
        fonction: 'MC_SIT',
        action: 'MC_SIT_DGD',
        code: 'MC_SIT_DGD'
    },
    {
        module: 'MC',
        fonction: 'MC_SIT',
        action: 'MC_SIT_LRG',
        code: 'MC_SIT_LRG'
    },
    {
        module: 'MC',
        fonction: 'MC_SIT',
        action: 'MC_SIT_ANN',
        code: 'MC_SIT_ANN'
    },
    {
        module: 'MC',
        fonction: 'MC_SIT',
        action: 'MC_SIT_DEL',
        code: 'MC_SIT_DEL'
    },
    {
        module: 'MC',
        fonction: 'MC_FAC_VALID',
        code: 'MC_FAC_VALID'
    },
    {
        module: 'MC',
        fonction: 'MC_OD',
        code: 'MC_OD'
    },
    {
        module: 'MC',
        fonction: 'MC_OD',
        action: 'MC_OD_NEW',
        code: 'MC_OD_NEW'
    },
    {
        module: 'MC',
        fonction: 'MC_OD',
        action: 'MC_OD_ANN',
        code: 'MC_OD_ANN'
    },
    {
        module: 'MC',
        fonction: 'MC_OD',
        action: 'MC_OD_DEL',
        code: 'MC_OD_DEL'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        code: 'ADV_GP'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_GP_GROUP',
        code: 'ADV_GP_GROUP'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_GP_DEGROUP',
        code: 'ADV_GP_DEGROUP'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_GP_VBLOC',
        code: 'ADV_GP_VBLOC'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_GP_NVBLOC',
        code: 'ADV_GP_NVBLOC'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_GP_CHGTC',
        code: 'ADV_GP_CHGTC'
    }, {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_GP_ADD',
        code: 'ADV_GP_ADD'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_GP_DEL',
        code: 'ADV_GP_DEL'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_GP_VAL_SURF',
        code: 'ADV_GP_VAL_SURF'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_GP_ANN_SURF',
        code: 'ADV_GP_ANN_SURF'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_PO',
        code: 'ADV_PO'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_PO_ANN',
        code: 'ADV_PO_ANN'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_TM_FORCE',
        code: 'ADV_TM_FORCE'
    },
    {
        module: 'ADV',
        fonction: 'ADV_TM',
        code: 'ADV_TM'
    },
    {
        module: 'ADV',
        fonction: 'ADV_TVA',
        code: 'ADV_TVA'
    },
    {
        module: 'ADV',
        fonction: 'ADV_SURF',
        code: 'ADV_SURF'
    },
    {
        module: 'ADV',
        fonction: 'ADV_PXBUD',
        code: 'ADV_PXBUD'
    },
    {
        module: 'ADV',
        fonction: 'ADV_PXCOMM',
        code: 'ADV_PXCOMM'
    },
    {
        module: 'ADV',
        fonction: 'ADV_PXLANC',
        code: 'ADV_PXLANC'
    },
    {
        module: 'ADV',
        fonction: 'ADV_GP',
        action: 'ADV_ENC_DATION',
        code: 'ADV_ENC_DATION'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        code: 'ADV_RV'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_NEW',
        code: 'ADV_RV_NEW'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_DES',
        code: 'ADV_RV_DES'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_VENTE',
        code: 'ADV_RV_VENTE'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_ANN',
        code: 'ADV_RV_ANN'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_VENTE_ANN',
        code: 'ADV_RV_VENTE_ANN'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_LIV_ANN',
        code: 'ADV_RV_LIV_ANN'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_LOC_ANN',
        code: 'ADV_RV_LOC_ANN'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_RES',
        code: 'ADV_RV_RES'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_LIV',
        code: 'ADV_RV_LIV'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_AIDE',
        code: 'ADV_RV_AIDE'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_TMFORCE',
        code: 'ADV_RV_TMFORCE'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV',
        action: 'ADV_RV_PSLA_REMISE',
        code: 'ADV_RV_PSLA_REMISE'
    },
    {
        module: 'ADV',
        fonction: 'ADV_RV_MASSE',
        code: 'ADV_RV_MASSE'
    },
    {
        module: 'ADV',
        fonction: 'ADV_TMA',
        code: 'ADV_TMA'
    },
    {
        module: 'ADV',
        fonction: 'ADV_STTRV',
        code: 'ADV_STTRV'
    },
    {
        module: 'ADV',
        fonction: 'ADV_AF',
        code: 'ADV_AF'
    },
    {
        module: 'ADV',
        fonction: 'ADV_AF',
        action: 'ADV_AF_DEL',
        code: 'ADV_AF_DEL'
    },
    {
        module: 'ADV',
        fonction: 'ADV_TMA_AF',
        code: 'ADV_TMA_AF'
    },
    {
        module: 'ADV',
        fonction: 'ADV_ENC',
        code: 'ADV_ENC'
    },
    {
        module: 'ADV',
        fonction: 'ADV_ENC',
        action: 'ADV_ENC_DEL',
        code: 'ADV_ENC_DEL'
    },
    {
        module: 'ADV',
        fonction: 'ADV_SUIVICLI',
        code: 'ADV_SUIVICLI'
    },
    {
        module: 'ADV',
        fonction: 'ADV_FACR',
        code: 'ADV_FACR'
    },
    {
        module: 'ADV',
        fonction: 'ADV_FACR',
        action: 'ADV_FACR_ADD',
        code: 'ADV_FACR_ADD'
    },
    {
        module: 'ADV',
        fonction: 'ADV_FACR',
        action: 'ADV_FACR_DEL',
        code: 'ADV_FACR_DEL'
    },
    {
        module: 'ADV',
        fonction: 'ADV_FACR',
        action: 'ADV_FACR_ANN',
        code: 'ADV_FACR_ANN'
    },
    {
        module: 'ADV',
        fonction: 'ADV_FACR_ENC',
        code: 'ADV_FACR_ENC'
    },
    {
        module: 'ADV',
        fonction: 'ADV_FACR_ENC',
        action: 'ADV_FACR_ENC_DEL',
        code: 'ADV_FACR_ENC_DEL'
    },
    {
        module: 'ADV',
        fonction: 'ADV_CMD',
        code: 'ADV_CMD'
    },
    {
        module: 'ADV',
        fonction: 'ADV_CMD',
        action: 'ADV_CMD_ADD',
        code: 'ADV_CMD_ADD'
    },
    {
        module: 'ADV',
        fonction: 'ADV_CMD',
        action: 'ADV_CMD_DEL',
        code: 'ADV_CMD_DEL'
    },
    {
        module: 'ADV',
        fonction: 'ADV_CMD',
        action: 'ADV_CMD_FAC',
        code: 'ADV_CMD_FAC'
    },
    {
        module: 'ADV',
        fonction: 'ADV_CMD',
        action: 'ADV_CMD_SOLDE',
        code: 'ADV_CMD_SOLDE'
    },
    {
        module: 'ADV',
        fonction: 'ADV_CMD',
        action: 'ADV_CMD_AVOIR',
        code: 'ADV_CMD_AVOIR'
    },
    {
        module: 'FIN',
        fonction: 'FIN',
        code: 'FIN'
    },
    {
        module: 'FIN',
        fonction: 'FIN_PRET',
        code: 'FIN_PRET'
    },
    {
        module: 'FIN',
        fonction: 'FIN_SUBV',
        code: 'FIN_SUBV'
    },
    {
        module: 'FIN',
        fonction: 'FIN_CADRE',
        code: 'FIN_CADRE'
    },
    {
        module: 'TI',
        code: 'TI'
    },
    {
        module: 'P',
        code: 'P'
    },
    {
        module: 'P',
        fonction: 'P_ADM',
        code: 'P_ADM'
    },
    {
        module: 'P',
        fonction: 'P_PROC',
        code: 'P_PROC'
    },
    {
        module: 'P',
        fonction: 'P_OP',
        code: 'P_OP'
    },
    {
        module: 'P',
        fonction: 'P_BUD',
        code: 'P_BUD'
    },
    {
        module: 'P',
        fonction: 'P_TRESO',
        code: 'P_TRESO'
    },
    {
        module: 'P',
        fonction: 'P_CPTA',
        code: 'P_CPTA'
    },
    {
        module: 'P',
        fonction: 'P_FIN',
        code: 'P_FIN'
    },
    {
        module: 'P',
        fonction: 'P_MBC',
        code: 'P_MBC'
    },
    {
        module: 'P',
        fonction: 'P_TC',
        code: 'P_TC'
    },
    {
        module: 'P',
        fonction: 'P_TMA',
        code: 'P_TMA'
    },
    {
        module: 'P',
        fonction: 'P_TIERS',
        code: 'P_TIERS'
    },
    {
        module: 'P',
        fonction: 'P_FON',
        code: 'P_FON'
    },
    {
        module: 'P',
        fonction: 'P_PERSO',
        code: 'P_PERSO'
    },
    {
        module: 'P',
        fonction: 'P_EDIT',
        code: 'P_EDIT'
    },
    {
        module: 'P',
        fonction: 'P_CRM',
        code: 'P_CRM'
    },
    {
        module: 'P',
        fonction: 'P_MOB',
        code: 'P_MOB'
    },
    {
        module: 'FIN',
        fonction: 'FIN_PRET_GAR',
        code: 'FIN_PRET_GAR'
    },
    {
        module: 'FIN',
        fonction: 'FIN_CONTRAT',
        code: 'FIN_CONTRAT'
    },
    {
        module: 'FIN',
        fonction: 'FIN_PRET_VERS',
        code: 'FIN_PRET_VERS'
    },
    {
        module: 'FIN',
        fonction: 'FIN_DECISION',
        code: 'FIN_DECISION'
    },
    {
        module: 'FIN',
        fonction: 'FIN_SUBV_VERS',
        code: 'FIN_SUBV_VERS'
    },
    {
        module: 'TI',
        fonction: 'TI',
        action: 'TI_NEW',
        code: 'TI_NEW'
    },
    {
        module: 'TI',
        fonction: 'TI',
        action: 'TI_DEL',
        code: 'TI_DEL'
    },
    {
        module: 'TI',
        fonction: 'TI_ID',
        code: 'TI_ID'
    },
    {
        module: 'TI',
        fonction: 'TI_CPTA',
        code: 'TI_CPTA'
    },
    {
        module: 'TI',
        fonction: 'TI_JURI',
        code: 'TI_JURI'
    },
    {
        module: 'TI',
        fonction: 'TI_ADR',
        code: 'TI_ADR'
    },
    {
        module: 'TI',
        fonction: 'TI_RIB',
        code: 'TI_RIB'
    },
    {
        module: 'TI',
        fonction: 'TI_REPRES',
        code: 'TI_REPRES'
    },
    {
        module: 'TR',
        fonction: 'TR',
        code: 'TR'
    },
    {
        module: 'TR',
        fonction: 'TR_CONSO',
        code: 'TR_CONSO'
    },
    {
        module: 'TR',
        fonction: 'TR_PARAM',
        code: 'TR_PARAM'
    },
];

export function getDefinitionDroits(c?: boc.Container): IDrModule[] {
    if (!c) {
        return droits;
    } else {
        const traductions: { [code: string]: { [code: string]: string } } = {
            modules: {
                OP: c.t('Opérations'),
                SOC: c.t('Société'),
                MC: c.t('Marché Commande Facturation'),
                ADV: c.t('Recettes'),
                FIN: c.t('Dossier Financement'),
                P: c.t('Paramétrage'),
                TI: c.t('Tiers'),
                TR: c.t('Trésorerie consolidée'),
                TB: c.t('Tableau de bord'),
            },
            fonctions: {
                OP: c.t('Dossier opération'),
                OP_FON: c.t('Foncier'),
                OP_VER: c.t('Version'),
                OP_TT: c.t('Tranche travaux'),
                OP_TC: c.t('Tranche commerciale'),
                OP_TL: c.t('Tranche locative'),
                OP_PROC: c.t('Suivi Dossier'),
                OP_GANTT: c.t('Planning'),
                OP_ACTR: c.t('Intervenants'),
                OP_BUD: c.t('Budget'),
                OP_SBUD: c.t('Suivi budgétaire'),
                OP_COMM: c.t('Commercialisation'),
                OP_TRESO: c.t('Trésorerie'),
                OP_REAFBUD: c.t('Réaffectation budgétaire'),
                OP_EDIT: c.t('Editions'),
                OP_DOC_JOIN: c.t('Documents joints'),

                SOC: c.t('Dossier Société'),
                SOC_EXE: c.t('Exercice et clôture'),
                SOC_PERIM: c.t('Périmètre'),
                SOC_FFI: c.t('Frais financiers'),
                SOC_EXPCPT: c.t('Validation export comptable'),
                SOC_FLUXFI: c.t('Flux financiers'),
                SOC_CB: c.t('Comptes bancaires'),
                SOC_OP: c.t('Changement de société d\'une opération'),
                SOC_OPACH: c.t('Passage d\'une opération du statut lancé au statut achevé'),
                SOC_OPTERM: c.t('Opération en cours terminé'),
                SOC_IAC: c.t('Inventaire achèvement'),
                SOC_MARGE: c.t('Modification marge'),
                SOC_IAV_REC: c.t('Inventaire avancement anticipation recette'),
                SOC_IAV_FNP: c.t('Inventaire avancement FNP en cours'),
                SOC_IAV_CAL: c.t('Inventaire avancement calcul périodique'),
                SOC_APAYER: c.t('Liste des factures à payer'),

                MC: c.t('Marché Commande Facturation'),
                MC_BC: c.t('Bon de commande'),
                MC_AVBC: c.t('Avenant Bon de commande'),
                MC_MAR: c.t('Marché'),
                MC_TCE: c.t('Marché TCE'),
                MC_MBC: c.t('Marché à bon de commande'),
                MC_PI: c.t('Marché PI'),
                MC_CES: c.t('Marché CES'),
                MC_ST: c.t('Sous traitant'),
                MC_AVN: c.t('Avenant marché'),
                MC_CAUT: c.t('Marché caution bancaire'),
                MC_DP: c.t('Marché délégation de paiement'),
                MC_FAC: c.t('Facture'),
                MC_FACD: c.t('Facture directe'),
                MC_FBC: c.t('Facture sur bon de commande'),
                MC_SIT: c.t('Situations de Travaux'),
                MC_FAC_VALID: c.t('Validation des situations et factures'),
                MC_OD: c.t('OD'),

                ADV_GP: c.t('Grille de prix vente'),
                ADV_RV: c.t('Dossier client'),
                ADV_TMA: c.t('TMA'),
                ADV_STTRV: c.t('Stade travaux'),
                ADV_AF: c.t('Appel fonds'),
                ADV_TMA_AF: c.t('Facturation TMA'),
                ADV_ENC: c.t('Encaissement'),
                ADV_SUIVICLI: c.t('Suivi compte client'),
                ADV_FACR: c.t('Facture recette'),
                ADV_FACR_ENC: c.t('Encaissement facture recette'),
                ADV_CMD: c.t('Commande recette'),
                ADV_RV_MASSE: c.t('Dossier client saisie en masse'),
                ADV_PXBUD: c.t('Prix budget'),
                ADV_PXCOMM: c.t('Prix commercial'),
                ADV_PXLANC: c.t('Prix lancement'),
                ADV_TM: c.t('TVA sur marge'),
                ADV_TVA: c.t('TVA'),
                ADV_SURF: c.t('Surfaces'),

                FIN: c.t('Dossier financement'),
                FIN_PRET: c.t('Suivi dossier de prêt'),
                FIN_PRET_GAR: c.t('Garantie de prêt'),
                FIN_CONTRAT: c.t('Contrat de prêt'),
                FIN_PRET_VERS: c.t('Versements prêt'),
                FIN_SUBV: c.t('Suivi dossier de subvention'),
                FIN_DECISION: c.t('Décision de financement'),
                FIN_SUBV_VERS: c.t('Versements subvention'),
                FIN_CADRE: c.t('Contrat cadre'),

                P_ADM: c.t('Administration et contrôle des accès'),
                P_PROC: c.t('Procédure et planning'),
                P_OP: c.t('Opérations'),
                P_BUD: c.t('Budget'),
                P_TRESO: c.t('Trésorerie'),
                P_CPTA: c.t('Comptabilité'),
                P_FIN: c.t('Dossier des financements'),
                P_MBC: c.t('Marchés et bons de commandes'),
                P_TC: c.t('Tranches commerciales'),
                P_TMA: c.t('TMA'),
                P_TIERS: c.t('Tiers'),
                P_FON: c.t('Foncier'),
                P_PERSO: c.t('Champs personnalisables'),
                P_EDIT: c.t('Editions'),
                P_CRM: c.t('CRM'),
                P_MOB: c.t('Mobilité'),

                TI: c.t('Fiche Tiers'),
                TI_ID: c.t('Identification'),
                TI_CPTA: c.t('Comptabilité'),
                TI_JURI: c.t('Juridique'),
                TI_ADR: c.t('Adresses'),
                TI_RIB: c.t('Banque'),
                TI_REPRES: c.t('Représentants'),

                TR: c.t('Trésorerie consolidée '),
                TR_CONSO: c.t('Trésorerie consolidée par modèle'),
                TR_PARAM: c.t('Paramétrage de la trésorerie consolidée'),
            },
            actions: {
                OP_NEW: c.t('Créer Opération'),
                OP_MODBUD: c.t('Modifier modèle de budget'),
                OP_DEL: c.t('Supprimer Opération'),
                OP_REPLACE_PROC: c.t('Remplacement de procédure & planning aux opérations existantes'),
                OP_FON_NEW: c.t('Créer'),
                OP_FON_DEL: c.t('Supprimer'),
                OP_FON_AB: c.t('Abandonner'),
                OP_FON_NEW_PAR: c.t('Créer parcelle'),
                OP_FON_DEL_PAR: c.t('Supprimer parcelle'),
                OP_FON_NEW_PRO: c.t('Créer propriétaire'),
                OP_FON_DEL_PRO: c.t('Supprimer propriétaire'),
                OP_VER_NEW: c.t('Ajouter'),
                OP_VER_DEL: c.t('Supprimer'),
                OP_VER_ARCH: c.t('Archiver'),
                OP_VER_TYPE: c.t('Modifier le type de version'),
                OP_VER_LIB: c.t('Modifier le libellé'),
                OP_VER_STATUT: c.t('Modifier le statut actualisé'),
                OP_VER_DATE: c.t('Modifier la date d\'arrêté'),
                OP_VER_CMNT: c.t('Modifier le commentaire'),
                OP_TT_NEW: c.t('Créer Tranche travaux'),
                OP_TT_DEL: c.t('Supprimer'),
                OP_TT_STATUT: c.t('Modifier avancement travaux'),
                OP_TC_NEW: c.t('Créer Tranche commerciale'),
                OP_TC_DEL: c.t('Supprimer Tranche commerciale'),
                OP_TC_ECH: c.t('Echéanciers'),
                OP_TC_AIDE: c.t('Aides à la vente'),
                OP_TC_TM: c.t('TVA sur marge'),
                OP_TC_GP: c.t('Créer grille de prix'),
                OP_TC_DGP: c.t('Supprimer grille de prix'),
                OP_TL_NEW: c.t('Créer Tranche locative'),
                OP_TL_DEL: c.t('Supprimer Tranche locative'),
                OP_PROC_ACT_DEL: c.t('Supprimer action'),
                OP_PROC_ACT_RENAME: c.t('Renommer action'),
                OP_PROC_ETP: c.t('Etapes facultatives'),
                OP_PROC_COMM: c.t('Modifier commentaire'),
                OP_GANTT_EXP: c.t('Exporter'),
                OP_ACTR_ADD: c.t('Ajouter'),
                OP_ACTR_DEL: c.t('Supprimer'),
                OP_BUD_NEW: c.t('Créer Budget'),
                OP_BUD_DEL: c.t('Supprimer Budget'),
                OP_BUD_AUT_VERR: c.t('Verrouiller autorisation budgétaire'),
                OP_BUD_CALC: c.t('Calculette'),
                OP_BUD_EXP: c.t('Exporter'),
                OP_TRESO_SAVE: c.t('Sauvegarde'),
                OP_EDIT_DL: c.t('Télécharger'),
                OP_EDIT_EDITMOD: c.t('Modèle personnalisé'),
                OP_DOC_JOIN_DL: c.t('Télécharger un document joint'),
                OP_DOC_JOIN_NEW: c.t('Ajouter un document'),
                OP_DOC_JOIN_MOD: c.t('Modifier un document'),
                OP_DOC_JOIN_DEL: c.t('Supprimer un document'),

                SOC_NEW: c.t('Créer'),
                SOC_DEL: c.t('Supprimer'),
                SOC_OP: c.t('Opérations rattachées'),
                SOC_EXE_NEW: c.t('Créer un exercice'),
                SOC_EXE_DEL: c.t('Supprimer un exercice'),
                SOC_EXE_CLOT: c.t('Clôturer'),
                SOC_EXE_DECLOT: c.t('Déclôturer'),
                SOC_FLUXFI_NEW: c.t('Créer'),
                SOC_FLUXFI_DEL: c.t('Supprimer'),
                SOC_CB_NEW: c.t('Créer compte bancaire'),
                SOC_CB_NEWOP: c.t('Créer compte à partir d\'une opération'),
                SOC_CB_DEL: c.t('Supprimer compte bancaire'),
                SOC_OP_TRANSF: c.t('Transfert'),
                SOC_OPACH_NEW: c.t('Date achèvement'),
                SOC_OPACH_DEL: c.t('Annuler date'),
                SOC_OPACH_CPT: c.t('Comptabiliser'),
                SOC_OPACH_TRANSF: c.t('Transfert'),
                SOC_OPACH_DELCPT: c.t('Annuler comptabilisation'),
                SOC_APAYER_ADD_BLOC: c.t('Saisir le blocage'),
                SOC_APAYER_DEL_BLOC: c.t('Supprimer le blocage'),
                SOC_APAYER_ADD_BON: c.t('Saisir le bon à payer'),
                SOC_APAYER_DEL_BON: c.t('Supprimer le bon à payer'),
                SOC_APAYER_ADD_REG: c.t('Saisir le règlement'),
                SOC_APAYER_DEL_REG: c.t('Supprimer le règlement'),

                MC_BC_NEW: c.t('Créer Bon de commande'),
                MC_BC_IMPREVU: c.t('Affecter le budget imprévu'),
                MC_BC_EDITION: c.t('Edition Word'),
                MC_BC_ENG: c.t('Engager Bon de commande'),
                MC_BC_DESENG: c.t('Désengager'),
                MC_AVBC_ENG: c.t('Engager Avenant'),
                MC_AVBC_DESENG: c.t('Désengager Avenant'),
                MC_MAR_AUTOLIQ: c.t('Autoliquidation'),
                MC_TCE_NEW: c.t('Créer marché TCE'),
                MC_TCE_IMPREVU: c.t('Affecter le budget imprévu'),
                MC_TCE_ENG: c.t('Engager'),
                MC_TCE_DESENG: c.t('Désengager'),
                MC_MBC_NEW: c.t('Créer marché à Bon de commande'),
                MC_PI_NEW: c.t('Créer'),
                MC_PI_IMPREVU: c.t('Affecter le budget imprévu'),
                MC_PI_ENG: c.t('Engager'),
                MC_PI_DESENG: c.t('Désengager'),
                MC_CES_NEW: c.t('Créer'),
                MC_CES_IMPREVU: c.t('Affecter le budget imprévu'),
                MC_CES_ENG: c.t('Engager marché CES'),
                MC_CES_DESENG: c.t('Désengager marché CES'),
                MC_ST_NEW: c.t('Créer sous traitant'),
                MC_ST_ENG: c.t('Engager'),
                MC_AVN_NEW: c.t('Créer avenant'),
                MC_AVN_ENG: c.t('Engager'),
                MC_AVN_DESENG: c.t('Désengager'),
                MC_FACD_NEW: c.t('Créer'),
                MC_FACD_ANN: c.t('Annuler Facture directe'),
                MC_FACD_DEL: c.t('Supprimer Facture directe'),
                MC_FAC_PR: c.t('Prorata'),
                MC_FAC_PUC: c.t('Police unique de chantier'),
                MC_FAC_IE: c.t('Inter Entreprises'),
                MC_FAC_MULTX: c.t('Plusieurs taux TVA'),
                MC_FAC_TMU: c.t('Coche TVA multiple'),
                MC_FAC_IMPREVU: c.t('Affecter le budget imprévu'),
                MC_FBC_NEW: c.t('Créer'),
                MC_FBC_ANN: c.t('Annuler Facture sur Bon de commande'),
                MC_FBC_DEL: c.t('Supprimer Facture sur Bon de commande'),
                MC_SIT_NEW: c.t('Créer'),
                MC_SIT_AC: c.t('Accompte'),
                MC_SIT_DGD: c.t('DGD'),
                MC_SIT_LRG: c.t('Libération retenue de garantie '),
                MC_SIT_ANN: c.t('Annuler Situation de travaux'),
                MC_SIT_DEL: c.t('Supprimer Situation de travaux'),
                MC_OD_NEW: c.t('Créer OD'),
                MC_OD_ANN: c.t('Annuler OD'),
                MC_OD_DEL: c.t('Supprimer OD'),

                ADV_GP_GROUP: c.t('Grouper'),
                ADV_GP_DEGROUP: c.t('Dégrouper'),
                ADV_GP_VBLOC: c.t('Vente en bloc'),
                ADV_GP_NVBLOC: c.t('Non vente en bloc'),
                ADV_GP_CHGTC: c.t('Changer de tranche'),
                ADV_GP_ADD: c.t('Ajouter un lot'),
                ADV_GP_DEL: c.t('Supprimer un lot'),
                ADV_GP_VAL_SURF: c.t('Validation des surfaces définitives'),
                ADV_GP_ANN_SURF: c.t('Annulation de la validation des surfaces définitives'),
                ADV_PO: c.t('Poser une option'),
                ADV_PO_ANN: c.t('Annuler un option'),
                ADV_TM_FORCE: c.t('Forcer TVA sur marge'),
                ADV_ENC_DATION: c.t('Encaissement Dation'),
                ADV_RV_NEW: c.t('Réserver'),
                ADV_RV_ANN: c.t('Annuler Réserver'),
                ADV_RV_DES: c.t('Désistement'),
                ADV_RV_VENTE: c.t('Vente'),
                ADV_RV_VENTE_ANN: c.t('Annuler Vente'),
                ADV_RV_RES: c.t('Résolution'),
                ADV_RV_LIV: c.t('Livraison'),
                ADV_RV_LIV_ANN: c.t('Annuler Livraison'),
                ADV_RV_AIDE: c.t('Aide à la vente'),
                ADV_RV_TMFORCE: c.t('Forcer TVA sur marge'),
                ADV_RV_PSLA_REMISE: c.t('Forcer remise PSLA annuelle'),
                ADV_RV_LOC_ANN: c.t('Annuler Location'),
                ADV_AF_DEL: c.t('Supprimer'),
                ADV_ENC_DEL: c.t('Supprimer'),
                ADV_FACR_ADD: c.t('Créer'),
                ADV_FACR_DEL: c.t('Supprimer'),
                ADV_FACR_ANN: c.t('Annuler'),
                ADV_FACR_ENC_DEL: c.t('Supprimer'),
                ADV_CMD_ADD: c.t('Créer'),
                ADV_CMD_DEL: c.t('Supprimer'),
                ADV_CMD_FAC: c.t('Facturer'),
                ADV_CMD_SOLDE: c.t('Solder'),
                ADV_CMD_AVOIR: c.t('Avoir'),

                FIN: c.t('Dossier financement'),
                FIN_PRET: c.t('Suivi dossier de prêt'),
                FIN_SUBV: c.t('Suivi dossier de subvention'),
                FIN_CADRE: c.t('Contrat cadre'),

                TI_NEW: c.t('Créer'),
                TI_DEL: c.t('Supprimer')

            }
        };
        const result = droits.map((module) => ({
            code: module.code,
            action: traductions.actions[module.action],
            fonction: traductions.fonctions[module.fonction],
            module: traductions.modules[module.module],
            moduleCode: module.module
        }));
        return result;
    }
}
