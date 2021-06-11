import { ExtError } from '@phoenix/server-commons';
import * as boc from '@phoenix/boc';
const osmGeoCoder = require('node-open-geocoder'); // eslint-disable-line @typescript-eslint/no-var-requires

export class Gis {
    private container: boc.Container;

    constructor(c: boc.Container) {
        if (!c || !(c instanceof boc.Container)) {
            throw new ExtError(500, 'Require container');
        }
        this.container = c;
    }
    public async getLocation(address: string, noException?: boolean): Promise<{ lat: number, lng: number }> {
        if (!address) { return null; }
        return new Promise((resolve, reject) => {
            osmGeoCoder().geocode(address).end((err: any, res: any) => {
                if (err) {
                    reject(new boc.BOErr(err.message));
                    return;
                }
                if (!res.length) {
                    resolve(null);
                    return;
                }
                try {
                    const data = res[0];
                    resolve({
                        lat: parseFloat(data.lat),
                        lng: parseFloat(data.lon)
                    });
                } catch (e) {
                    resolve(null);
                }
            });
        });
    }

}