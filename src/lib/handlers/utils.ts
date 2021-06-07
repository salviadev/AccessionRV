import * as boc from '@phoenix/boc';

export class HandlerUtils {
    public static injectCodeInBody(code: string, body: any) {
        if (code) {
            body.code = code;
        }
    }
}