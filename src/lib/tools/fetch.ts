import nodeFetch from 'node-fetch';
// tslint:disable-next-line: no-duplicate-imports
import { RequestInit, RequestInfo, Response } from 'node-fetch';
import * as https from 'https';
import { URL } from 'url';

export interface IRequestInit extends RequestInit {
    ignoreCertificateErrors?: boolean;
}

export async function fetch(
    url: RequestInfo, init?: IRequestInit): Promise<Response> {
    let removeAgent = false;
    try {
        if (init && init.ignoreCertificateErrors && !init.agent) {
            const u = getUrl(url);
            const p = getProtocol(u);
            if (isHttps(p)) {
                init.agent = new https.Agent({
                    rejectUnauthorized: false,
                });
                removeAgent = true;
            }
        }
        return nodeFetch(url, init);
    } finally {
        if (removeAgent) {
            init.agent = null;
        }
    }
}
function getUrl(url: RequestInfo): string {
    if (typeof (url) === 'string') {
        return url;
    }
    if (typeof (url) === 'object') {
        return (url as any).url || (url as any).href;
    }
    return null;
}
function isHttps(protocol: string): boolean {
    return protocol && protocol.toLowerCase().startsWith('https');
}

function getProtocol(url: string) {
    const u = new URL(url);
    return u.protocol;
}