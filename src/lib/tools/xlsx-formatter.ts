import * as boc from '@phoenix/boc';
import { c } from '@phoenix/service-route';

export const FORMATTER_ID = 'xlsxFormatter';

export class XlsxPropFormatter implements boc.IPropFormatter {
    private stringFormatter: boc.StringPropFormatter;
    constructor() {
        this.stringFormatter = new boc.StringPropFormatter();
    }
    public format(prop: boc.BaseProperty) {
        const settings = prop.getSrcSettings() || {};
        const allTypeSettings: string[] = settings.jsFormats ? settings.jsFormats.slice() : [];
        if (settings.type) {
            allTypeSettings.push(settings.type);
        }
        const allTypes = [
            'money', 'date', 'date-time', 'integer', 'boolean', 'rate', 'code', 'memo', 'email',
        ];
        let type = 'string';
        for (const s of allTypeSettings) {
            let findIt = false;
            for (const t of allTypes) {
                if (s === t) {
                    type = s;
                    findIt = true;
                    break;
                }
            }
            if (findIt) {
                break;
            }
        }
        switch (type) {
            case 'number':
            case 'money':
            case 'integer':
                return this.formatNumber(prop.value);
            case 'rate':
                return this.formatRate(prop.value);
            default:
                return this.stringFormatter.format(prop);
        }
    }

    public formatNumber(value: number): number {
        if (value === undefined || value === null || isNaN(value)) {
            value = 0;
        }
        return value;
    }

    public formatRate(value: number): number {
        if (value === undefined || value === null || isNaN(value)) {
            value = 0;
        }
        return value / 100;
    }
}