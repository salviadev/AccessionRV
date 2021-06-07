export interface IDocumentReference {
    ref0: string;
    ref1?: string;
    ref2?: string;
    ref3?: string;
    ref4?: string;
    ref5?: string;
    ref6?: string;
    ref7?: string;
    ref8?: string;
    ref9?: string;
    ref10?: string;
    ref11?: string;
    ref12?: string;
    ref13?: string;
    ref14?: string;
    ref15?: string;
    ref16?: string;
    ref17?: string;
    ref18?: string;
    ref19?: string;
    ref20?: string;
}
export interface IDocument {
    code: string;
    libelle?: string;
    dateCreation?: string;
    dateModif?: string;
    commentaire?: string;
    proprietaire?: string;
    classement?: string;
    refs?: IDocumentReference[];
    typeDoc?: string;
    tailleFichier?: number;
    refFichier?: string;
    stockage?: string;
    contentStreamFileName?: string;
}

export interface IFile {
    code: string;
    nomFichier: string;
    typeFichier: string;
    tailleFichier: string;
}