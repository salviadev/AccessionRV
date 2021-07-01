import * as boc from '@phoenix/boc';
import { SpoPBPoste } from '../../models/SpoPBPoste';
import { PosteItemView } from '../../views/budget/postes/PosteItemView';
import { PostesView } from '../../views/budget/postes/PostesView';
@boc.ClsInfo({
    isRules: true,
    metadata: 'Accession'
})
export class PostesViewRules {

    @boc.ObjectInit({
        constr: PostesView,
    })
    private static async init(target: PostesView, msg: boc.Message) {
        const c = target.container;
        const postes = await  c.getDataObjects<{code: string, title:string, idpere: string}>(SpoPBPoste, {
            select:['id code', 'lib title', 'idpere']
        });

        const map = new Map<number, PosteItemView>();
        const mapCodeId = new Map<string, number>();
        for (const item of postes) {
            const posteView = await c.createNew<PosteItemView>(PosteItemView, null, null, false, {
                code: item.code,
                title: item.title,
            });
            posteView.mappings.idpere = item.idpere; 
            map.set(posteView.id, posteView);
            mapCodeId.set(posteView.code, posteView.id);
            // await target.postes.link(posteView);
        }
        for (const item of map) {
            const poste = item[1];
            if (!poste.mappings.idpere) {
                await target.postes.link(poste);

            } else {
                const idPoste = mapCodeId.get(poste.mappings.idpere); 
                const parent = map.get(idPoste);
                await parent.postes.link(poste);
            }
        }

    }

}