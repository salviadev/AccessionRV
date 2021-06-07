import * as express from 'express';
// const routes = ['*/version', '*/login'];

export async function acceptExpiredSession(req: express.Request): Promise<boolean> {
    const route: string = req.route.path;
    if (!route) {
        return false;
    }
    if (route.startsWith('*/ViewModels/')) {
        return false;
    }
    // if (routes.indexOf(route) >= 0) {
    //     return true;
    // }
    return true;
}