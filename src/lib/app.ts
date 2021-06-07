import * as bocServer from '@phoenix/boc-server';
import { ViewServer } from './view-server';
import { Utils } from './tools/utils';
import { TaskConfigurator } from './task-configurator';

const config = Utils.getConfig();
export const settings: bocServer.IHttpBocServerSettings = {
    viewServer: new ViewServer(),
    errorHandlerOptions: config.errorHandlerSettings,
    sessionOptions: config.sessionSettings,
    requestLoggerSettings: config.requestLoggerSettings,
    serviceRouteConfig: Utils.getServiceRouteConfig(),
    defaultPort: 3000,
    timeout: config.serverTimeout,
    handlersBaseDir: Utils.rootFolder,
    searchTasksInterval: config.searchTasksInterval,
    taskConfigurator: new TaskConfigurator(),
    tenants: Utils.getTenants(),
    bocInfoExtractorSettings: {
        defaultTenant: 'spo',
        sessionCookieName: config.sessionSettings.cookieName,
        tenantParamName: 'tenant',
        tokenCookieName: 'jwt',
        extractors: [bocServer.cookieExtractor('SPOUrl')]
    },
};

export const httpBocServer = new bocServer.HttpBocServer(settings);