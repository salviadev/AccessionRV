// tslint:disable:max-line-length
import * as boc from '@phoenix/boc';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import * as cookie from 'cookie';
import * as _ from 'lodash';
import * as express from 'express';
import { getReferencesOfEntity } from '@phoenix/schema';
import { ILogger, NoLogger, Logger } from '@phoenix/logger';
import * as winston from 'winston';
import { IAccessionRVSettings, IAccessionRVConfig, IDataDriverConfigs, IVersion, IOptimisation, DataDriverNames, IConfigOverridesByTenant } from '../interfaces';
import { defaultConfig } from '../config/default';
import { IErrorHandlerOptions, ISessionManagerSettings, IRequestLoggerSettings, ExtError } from '@phoenix/server-commons';
import { ConcurrencyAccessError } from '@phoenix/boc-interfaces';
import { acceptExpiredSession } from '../config/expired-session';
import { IGed } from './ged/ged';
import { model as accessionModel } from '../schemas/Accession_model';
import { Ged } from './ged/ged-cmis';
import { MiniGedAdapter } from './ged/ged-integrated';

const rootFolder = path.join(__dirname, '..', '..');
const packageFilePath = path.join(rootFolder, 'package.json');
const packageFile = fs.existsSync(packageFilePath) ? packageFilePath : path.join(rootFolder, '..', 'package.json');

export enum CloneParams {
    DUPPLIQUE,
    REFERENCE
}

export interface ICodeLibelle {
    code: string;
    libelle: string;
}

export class Utils {

    public static readonly rootFolder: string = rootFolder;
    public static readonly packageFile: string = packageFile;
    public static isEmpty(value: string): boolean {
        return value === undefined || value === null;
    }

    public static equals(value1: string, value2: string): boolean {
        return value1 === value2 || (value1 || null) === (value2 || null);
    }
    public static get tmpFolder() {
        const tmpFolder = path.join(Utils.rootFolder, 'tmp');
        if (!fs.existsSync(tmpFolder)) {
            fs.mkdirSync(tmpFolder);
        }
        return tmpFolder;
    }

    public static extractVariables(expression: string): string[] {
        const res: string[] = [];
        expression.replace(/\{([^{]*)\}/g, (match, p) => {
            res.push(p.trim());
            return '';
        });
        return res;
    }
    public static execExpression(expression: string, context: any, valueTitle: string, ci?: boolean): string {
        return expression.replace(/\{([^{]*)\}/g, (match, p) => {
            let propName = p.trim();
            if (valueTitle && propName.startsWith(valueTitle)) {
                propName = valueTitle;
            }
            const value = context[ci ? propName.toLocaleLowerCase() : propName];
            return value || '';
        });
    }
    public static get templatesFolder() {
        const folder = path.join(Utils.rootFolder, 'templates');
        if (fs.existsSync(folder)) {
            return folder;
        }
        return path.join(Utils.rootFolder, 'docs', 'templates');
    }
    public static async allocNewIds(constr: any, c: boc.Container, range: number): Promise<Array<number | string>> {
        if (!range || range < 0) {
            range = 1;
        }
        await c.allocNewIds(constr, range);
        const res: Array<number | string> = [];
        for (let i = 0; i < range; i++) {
            res.push(await c.getNewId(constr));
        }
        return res;
    }
    public static getErrorMessages(container: boc.Container, saveResult: boc.IRuleExecutionResult[], withDetails: boolean) {
        if (!container.lastSaveWasOK) {
            let firstError: boc.IError = null;
            let messages = boc.BocTools.thrownErrors(saveResult).map((e) => {
                if (!firstError) firstError = e.error;
                return e.error.message;
            }).join('\n');
            if (withDetails && firstError && firstError.details) {
                messages = messages + '\n' + firstError.details;
            }
            return messages;
        }
        return null;
    }
    public static checkAfterSave(container: boc.Container, saveResult: boc.IRuleExecutionResult[], errorFactory: (message: string, container: boc.Container) => Error = null, withDetails: boolean = true) {
        const message = this.getErrorMessages(container, saveResult, withDetails);
        if (message) {
            const error = errorFactory ? errorFactory(message, container) : new Error(message);
            throw error;
        }
    }
    public static raiseError(container: boc.Container, error: any) {
        let messageAdded = false;
        const message = typeof error === 'string' ? error : error.message;
        if (container.rootViewInfos && container.rootViewInfos.length) {
            for (const vieInfo of container.rootViewInfos) {
                messageAdded = true;
                vieInfo.viewModel.errors.addTransientError(message);
            }
        }
        if (!messageAdded)
            throw error;
    }
    public static async markModified(obj: boc.ModelObject) {
        if (obj.objectState === boc.ObjectState.Unmodified) {
            obj.setObjectState(boc.ObjectState.Modified);
        }
    }
    public static getOptions(): IAccessionRVConfig {
        if (!Utils.options) {
            let options = defaultConfig;
            const userConfigPath = path.join(rootFolder, 'config.js');
            if (fs.existsSync(userConfigPath)) {
                const userConfig: IAccessionRVConfig = require(userConfigPath); // eslint-disable-line @typescript-eslint/no-var-requires
                options = _.merge(options, userConfig);
            }
            Utils.options = options;
        }
        return Utils.options;
    }
    public static async cancelCreatedObjects(list: boc.ModelObject[]) {
        for (const o of list) {
            if (o.objectState === boc.ObjectState.New) {
                await o.toDelete();
            }
        }
    }
    public static async removeObjects(list: boc.ModelObject[]) {
        for (const o of list) {
            await o.toDelete();
        }
    }

    public static async checkCanRemoveObject(model: boc.ModelObject, excludedEntities: string[]) {
        const entityName: string = model.classInfo.constr.name;
        const am: any = accessionModel;
        if (am[entityName]) {
            const toCheck = getReferencesOfEntity(entityName, accessionModel, excludedEntities);
            const os = await model.container.getObjectStoreByName(DataDriverNames.SpoDirect);
            for (const check of toCheck) {
                const filter: any = {};
                check.foreignFields.forEach((fieldName, index) => {
                    filter[check.localFields[index]] = model.getProp(fieldName);
                });
                const res = await os.exists(check.entityName, filter);
                if (res) {
                    throw new boc.BOErr(model.container.t('Imposible de supprimer cet objet ("{{0}}") car il est utilisé dans "{{1}}".', entityName, check.entityTitle));
                }
            }
        }
    }
    public static getConfig(): IAccessionRVSettings {
        if (!Utils.config) {
            const logger = Utils.getLogger();
            const options = Utils.getOptions();
            const ignoreCertificateErrors = (typeof (options.ignoreCertificateErrors) === 'undefined') ?
                true : options.ignoreCertificateErrors;
            const serverTimeout: number = options.serverTimeout ? options.serverTimeout : undefined;
            const jwtSecret = options.jwtSecret || 'A456etzUmdgk7cvvl52az4cadpgsd51v';
            const defaultDataDriverSettings: IDataDriverConfigs = options.defaultDataDriver ?
                _.cloneDeep(options.defaultDataDriver) : {};
            for (const dataDriverName of DataDriverNames.all) {
                let driverSettings = defaultDataDriverSettings[dataDriverName];
                if (!driverSettings) {
                    driverSettings = {};
                    defaultDataDriverSettings[dataDriverName] = driverSettings;
                }
                if (typeof (driverSettings.ignoreCertificateErrors) === 'undefined') {
                    driverSettings.ignoreCertificateErrors = ignoreCertificateErrors;
                }
            }
            const cmis = options.CMIS || {};
            if (typeof (cmis.ignoreCertificateErrors) === 'undefined') {
                cmis.ignoreCertificateErrors = ignoreCertificateErrors;
            }
            const docMerge = options.DocMerge || {};
            if (typeof (docMerge.ignoreCertificateErrors) === 'undefined') {
                docMerge.ignoreCertificateErrors = ignoreCertificateErrors;
            }

            const tenants: IConfigOverridesByTenant = options.tenants ?
                _.cloneDeep(options.tenants) : {};

            const errorHandlerSettings: IErrorHandlerOptions = {
                stackTrace: options.log && (typeof (options.log.stackTrace) === 'boolean') ? options.log.stackTrace : false,
                logger,
            };
            const session = options.session || {};
            const sessionSettings: ISessionManagerSettings = {
                cookieName: session.cookieName || 'Accession',
                clearInterval: session.clearInterval || 3 * 60,
                timeOut: 20 * 60,
                logger,
                acceptExpiredSession
            };

            const requestLoggerSettings: IRequestLoggerSettings = {
                requestProperties: options.log.requestProperties,
                logger,
                isError: (requestLogger, req, res) => this.isErrorResponse(req, res),
            };

            const version: IVersion = options.version || {};
            if (typeof (version.checkVersion) !== 'boolean') {
                version.checkVersion = false;
            }
            version.entityName = version.entityName || 'RVDossier';

            const useGED = typeof (options.useGED) === 'boolean' ? options.useGED : true;
            const useCMIS = typeof (options.useCMIS) === 'boolean' ? options.useCMIS : true;
            const useDocMerge = typeof (options.useGED) === 'boolean' || typeof (options.useCMIS) === 'boolean' ? options.useDocMerge : true;
            const useGIS = typeof (options.useGIS) === 'boolean' ? options.useGIS : true;
            const simuSPO = typeof (options.simuSPO) === 'boolean' ? options.simuSPO : false;
            const searchTasksInterval = options.searchTasksInterval || 60;
            const spoUrl = options.spoUrl;
            const optimisation: IOptimisation = options.optimisation || {
                noWiredRules: false,
            };
            const doNotAuthenticate: boolean = options.doNotAuthenticate || false;
            const resourcesFolder: string = options.resourcesFolder || null;
            const osmServerUrl: string = options.osmServerUrl || null;
            const pathChrome: string = options.pathChrome || null;
            const gedStoragePath: string = options.gedStoragePath || null;
            const baseUrl: string = options.baseUrl || null;
            const pathAccessionUX: string = options.pathAccessionUX || null;
            const useInseeData: boolean = options.useInseeData;
            const inseeToken: string = options.inseeToken || null;

            if (optimisation.noWiredRules === undefined || optimisation.noWiredRules === null) {
                optimisation.noWiredRules = false;
            }
            const defaultCulture = options.defaultCulture || 'fr-fr';
            const apiConfig = options.apiConfig;
            Utils.config = {
                defaultDataDriverSettings,
                tenants,
                CMIS: cmis,
                DocMerge: docMerge,
                errorHandlerSettings,
                requestLoggerSettings,
                sessionSettings,
                useGED,
                gedStoragePath,
                useCMIS,
                useDocMerge,
                useGIS,
                simuSPO,
                version,
                searchTasksInterval,
                optimisation,
                resourcesFolder,
                osmServerUrl,
                useRights: options.useRights,
                userId: options.userId,
                profId: options.profId,
                doNotAuthenticate,
                spoUrl,
                baseUrl,
                pathChrome,
                pathAccessionUX,
                ignoreCertificateErrors,
                serverTimeout,
                jwtSecret,
                defaultCulture,
                apiConfig,
                useInseeData,
                inseeToken,
            };
        }
        return Utils.config;
    }

    public static isErrorResponse(req: express.Request, res: express.Response) {
        if (res.statusCode === 404
            && req.route
            && req.route.path.startsWith('*/api/resource/')
            && req.params
            && req.params.resourceClass === 'ope'
            && req.params.resourceType === 'img') {
            return false;
        }
        return res.statusCode >= 400;
    }
    public static getTenants(): string[] {
        const config = Utils.getConfig();
        let tenants = config.tenants ? Object.getOwnPropertyNames(config.tenants) : [boc.Server.defaultTenantName];
        if (!tenants.length) {
            tenants = [boc.Server.defaultTenantName];
        }
        return tenants;
    }
    public static getServiceRouteConfig(): any {
        if (Utils.configRoutes) {
            return Utils.configRoutes;
        }
        Utils.configRoutes = (require('../config/routes') || {}).config;
        Utils.configRoutes = Utils.configRoutes || {};
        return Utils.configRoutes;
    }

    public static getLogger(): ILogger {
        if (Utils.logger) {
            return Utils.logger;
        }
        let winstonLogger: winston.Logger;
        const defaultLoggerConfigPath = path.join(__dirname, '../config/');
        for (const folder of [rootFolder, defaultLoggerConfigPath]) {
            const logConfigFileName = path.join(folder, 'logger-conf.js');
            if (fs.existsSync(logConfigFileName)) {
                winstonLogger = require(logConfigFileName);
                break;
            }
        }
        Utils.logger = winstonLogger ? new Logger(winstonLogger) : new NoLogger();
        return Utils.logger;
    }

    public static async createGed(c: boc.Container): Promise<IGed> {
        if (!c || !(c instanceof boc.Container)) {
            throw new ExtError(500, 'Require container');
        }
        const settings = Utils.getOptions();
        if (settings.useCMIS) {
            const cmisConfig = settings.CMIS;
            if (cmisConfig && cmisConfig.url) {
                return new Ged(cmisConfig);
            }
        }
        if (settings.useGED) {
            if (settings.gedStoragePath) {
                return new MiniGedAdapter(c, settings.gedStoragePath);
            }
        }
        return;
    }

    public static async createTheTwoGed(c: boc.Container): Promise<{ local: IGed, ged: IGed }> {
        if (!c || !(c instanceof boc.Container)) {
            throw new ExtError(500, 'Require container');
        }
        const config = Utils.getOptions();
        const cmisConfig = config.CMIS;
        if (!cmisConfig || !cmisConfig.url) {
            throw new Error(c.t('Il manque l\'entrée "CMIS.url". dans le fichier config'));
        }
        const ged = new Ged(cmisConfig);
        if (!config.gedStoragePath) {
            throw new Error(c.t('Il manque l\'entrée "gedStoragePath". dans le fichier config'));
        }
        const local = new MiniGedAdapter(c, config.gedStoragePath);
        return { local, ged };
    }

    public static getVersion(): string {
        const packageInfo = this.getJSONFile(packageFile);
        return packageInfo ? packageInfo.version : '0.0.0';
    }

    public static async genNumBuild(): Promise<any> {
        const packageInfo = this.getJSONFile(packageFile);
        const version: string = packageInfo.version;
        const v: string[] = version.split('.');
        v[2] = this.formatDate();
        const newVersion: string = v.join('.');
        packageInfo.version = newVersion;
        return await fs.writeFile(packageFilePath, JSON.stringify(packageInfo, null, 4), (err) => err);
    }

    public static isBlank(val: any): boolean {
        return (val === undefined || val === null);
    }

    public static getJSONFile(fileName: string): any {
        return JSON.parse(fs.readFileSync(fileName, 'utf8'));
    }

    public static async partition(total: number, list: any[], src: string, fixNumber?: boolean): Promise<Array<{ o: boc.BaseViewModel, part: number }>> {
        let value = -1;
        let maxIndex: number = -1;
        let totalSrc: number = 0;
        total = total || 0;
        let rest: number = total;
        const result: any[] = [];

        let index = 0;
        for (const item of list) {
            let mapItem: any = {};
            if (item.mapper) { await item.mapper.map(null, mapItem); }
            if (!mapItem || _.isEmpty(mapItem)) { mapItem = item.data; }
            const cv = mapItem[src] || 0;
            if (Math.abs(cv) > value) {
                value = Math.abs(cv);
                maxIndex = index;
            }
            totalSrc += cv;
            index++;
        }
        if (totalSrc !== 0 && maxIndex >= 0) {
            index = 0;
            for (const item of list) {
                let mapItem: any = {};
                if (item.mapper) { await item.mapper.map(null, mapItem); }
                if (!mapItem || _.isEmpty(mapItem)) { mapItem = item.data; }
                const part: number = total * (mapItem[src] || 0) / totalSrc;
                const realPart: number = fixNumber ? this.fixNumber(part) : part;
                result.push({ o: item, part: realPart });
                rest = fixNumber ? this.fixNumber(rest - realPart) : rest - realPart;
                index++;
            }
            if (rest !== 0) {
                result[maxIndex].part += rest;
            }
        }
        return result;
    }

    public static fixNumber(x: number, decimals?: number): number {
        if (decimals === undefined)
            decimals = 2;
        return parseFloat(x.toFixed(decimals));
    }

    public static getContainer(c: boc.Container, idContainer: string): boc.Container {
        const containers = c.sessionServices.getContainers();
        for (const co of containers) {
            if (co.id === idContainer) {
                return co;
            }
        }
        return null;
    }
    public static uuid22(): string {
        const x = uuid();
        const x2: string = x.split('-').join('');
        const buf: Buffer = Buffer.from(x2, 'hex');
        const base64: string = buf.toString('base64');
        const uid: string = base64.split('=').join('').replace(/\+/g, '-').replace(/\//g, '_');
        return uid;
    }

    public static setCookies(headers: any, cookies: any) {
        if (!cookies || typeof cookies !== 'object') {
            return;
        }
        const oldCookies = headers.Cookie ? cookie.parse(headers.Cookie) : {};
        const oldCookieNames = Object.getOwnPropertyNames(oldCookies);
        const newCookieNames = Object.getOwnPropertyNames(cookies);
        const elements: string[] = [];
        for (const oldCookieName of oldCookieNames) {
            if (newCookieNames.indexOf(oldCookieName) < 0) {
                elements.push(`${oldCookieName}=${oldCookies[oldCookieName]}`);
            }
        }
        for (const cookieName of newCookieNames) {
            elements.push(`${cookieName}=${cookies[cookieName]}`);
        }
        if (elements.length) {
            headers.Cookie = elements.join(';');
        } else {
            delete headers.Cookie;
        }
    }
    public static combineUrl(...args: string[]) {
        return args
            .filter((v) => v)
            .map((v) => v.replace(/\/$/, ''))
            .join('/');
    }

    public static round(val: number, arrondi: number): number {
        const x = val / arrondi;
        const y = Math.round(x);
        const z = y * arrondi;
        return z;
    }

    public static isFirstModif(c: boc.Container, constr: string, propName: string): boolean {
        const msgRouter: any = c.messageRouter;
        const stack0: any = msgRouter.stack[0];
        return stack0.message.body.propName === propName && stack0.message.constr.name === constr;
    }

    // public static decodeSpoDbCookie(spoDbCookie: string): any {
    //     if (!cookie) {
    //         return undefined;
    //     }
    //     const decodedCookie = Buffer.from(spoDbCookie, 'base64').toString();
    //     let result: any;
    //     try {
    //         result = JSON.parse(decodedCookie);
    //         if (typeof result !== 'object') {
    //             result = undefined;
    //         }
    //     } catch (e) {
    //         result = undefined;
    //     }
    //     return result;
    // }

    public static deleteDoublons(arr: any[]): any[] {
        const uniqueArr: any[] = [];
        for (const a of arr) {
            if (uniqueArr.indexOf(a) === -1) {
                uniqueArr.push(a);
            }
        }
        return uniqueArr;
    }

    public static formatId(id: number, length?: number): string {
        const l = length || 8;
        const idStr: string = id.toString(10);
        let result: string = idStr;
        while (result.length < l) {
            result = '0' + result;
        }
        return result;
    }

    public static getExtraInfo(prop: boc.BaseProperty): any {
        const propDeclaration = prop.owner.classInfo.allProperties.find((p) => p.name === prop.propName);
        const extraInfo = propDeclaration && propDeclaration.info.extraInfo;
        return extraInfo;
    }

    public static exactPlus(a: number, b: number, e?: number): number {
        const aStr: string = String(a);
        const bStr: string = String(b);
        e = e || 10;
        const arrayA: string[] = aStr.split('\.');
        const arrayB: string[] = bStr.split('\.');
        let deci: number = 0;
        if (arrayA.length > 1) {
            deci = arrayB.length > 1 ?
                ((arrayA[1].length > arrayB[1].length) ? arrayA[1].length : arrayB[1].length) :
                arrayA[1].length;
        } else {
            deci = arrayB.length > 1 ? arrayB[1].length : 0;
        }
        const c: number = Number(aStr) + Number(bStr);
        const expo: number = (Math.pow(10, deci));
        const result: number = Number((Math.round(c * expo) / expo).toFixed(e));
        return result;
    }

    public static getFromMap<T1, T2>(map: Map<T1, T2>, key: T1, defVal: T2): T2 {
        const val: T2 = map.get(key);
        if (val) return val;
        map.set(key, defVal);
        return defVal;
    }

    public static pushOrCreate(o: any, key: string, val: any): number {
        o[key] = o[key] || [];
        return o[key].push(val);
    }

    public static checkMandatoryFields(o: boc.BaseViewModel | boc.ModelObject, mandatoryFields: string[], oError?: boc.BaseViewModel | boc.ModelObject): void {
        const c: boc.Container = o.container;
        const oErr: boc.BaseViewModel | boc.ModelObject = oError || o;
        for (const mandatoryField of mandatoryFields) {
            if (!o.getProp(mandatoryField)) {
                oErr.errors.addError(c.t('Le champ {{0}} est obligatoire', mandatoryField));
            }
        }
    }
    public static async cloneObject(source: boc.ModelObject, dest: boc.ModelObject, excludedProps: string[]) {
        excludedProps = excludedProps || [];
        const primaryKeyFields = source.classInfo.primaryKeyFields;
        const businessKeyFields = source.classInfo.businessKeyFields;
        if (primaryKeyFields && primaryKeyFields.length)
            excludedProps = excludedProps.concat(primaryKeyFields);
        if (businessKeyFields && businessKeyFields.length)
            excludedProps = excludedProps.concat(businessKeyFields);
        let roleProps: string[] = [];
        const roles = source.relationsInfos.getRoles();
        for (const roleInfo of roles) {
            if (roleInfo.isMany) continue;
            const key = roleInfo.settings.key;
            if (key && key.length)
                roleProps = roleProps.concat(key);
        }
        if (roleProps && roleProps.length)
            excludedProps = excludedProps.concat(roleProps);
        for (const p of Object.keys(source.properties)) {
            const propName: string = source.properties[p].propName;
            if (excludedProps.indexOf(propName) < 0) {
                dest.setPropNoRuleExecution(propName, (source as any)[propName]);
            }
        }
    }

    public static async cloneObjectCompos(o: boc.ModelObject, d: boc.ModelObject, params: any, rolePath?: string): Promise<void> {
        const c: boc.Container = o.container;
        // Get props
        let propsNames: string[] = [];
        for (const p of Object.keys(o.properties)) {
            const propName: string = o.properties[p].propName;
            if (o.classInfo.primaryKeyFields.indexOf(propName) === -1) propsNames.push(propName);
        }
        for (const role of Object.keys(o.roles)) {
            for (const k of o.roles[role].settings.key) {
                propsNames = propsNames.filter((p) => p !== k);
            }
        }
        // Set props
        for (const propName of propsNames) {
            d.data[propName] = o.classInfo.businessKeyFields.indexOf(propName) !== -1 ? this.uuid22() : o.data[propName];
        }
        propsNames = [];
        // Gestion roles composition
        for (const kRole of Object.keys(o.roles)) {
            const role: any = o.roles[kRole];
            if (role.isMany && params[kRole] !== undefined && params[kRole] === CloneParams.DUPPLIQUE) {
                const newRolePath: string = rolePath ? rolePath + kRole : kRole;
                const newParams: any = this.majParams(params, newRolePath);
                const oRelModels: boc.ModelObject[] = await (o as any)[role.settings.roleProp].toArray();
                for (const oRelModel of oRelModels) {
                    const dRelModel: boc.ModelObject = await c.createNew(role.settings.oppositeConstr);
                    await this.cloneObjectCompos(oRelModel, dRelModel, newParams, newRolePath);
                    dRelModel.data.parentId = o.data.id;
                    dRelModel.ownerRole = role;
                    if (!d.data[role.settings.roleProp]) d.data[role.settings.roleProp] = [];
                    d.data[role.settings.roleProp].push(dRelModel.data);
                }
            } else if (!role.isMany && params[kRole] !== undefined && params[kRole] === CloneParams.REFERENCE) {
                for (const k of o.roles[kRole].settings.key) {
                    if (propsNames.indexOf(k) < 0)
                        propsNames.push(k);
                }
            }
        }
        // Set props
        for (const propName of propsNames) {
            d.data[propName] = o.classInfo.businessKeyFields.indexOf(propName) !== -1 ? this.uuid22() : o.data[propName];
        }

    }

    public static isMail(mail: string) {
        const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(mail);
    }

    public static isNomPrenom(nom: string) {
        const re = /^[a-z]+[ \-']?[[a-z]+[ \-']?]*[a-z]+$/i;
        return re.test(nom);
    }

    public static isWebSite(site: string) {
        const re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
        return re.test(site);
    }

    public static isCPFR(adrCP: string) {
        const re = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
        return re.test(adrCP);
    }

    public static isPhone(phone: string): boolean {
        const svalue = phone || '';
        for (let i = 0; i < svalue.length; i++) {
            const c = svalue.charAt(i);
            if ('+-() 0123456789.'.indexOf(c) < 0)
                return false;
        }
        return true;
    }

    public static cryptageMdp(stringMdp: string): string {
        return '';
    }

    public static async translateError(error: Error, container: boc.Container): Promise<Error> {
        if (error instanceof ConcurrencyAccessError) {
            const e = error as ConcurrencyAccessError;
            let entity = e.resourceName;
            const am: any = accessionModel;
            if (entity && am[entity])
                if (am[entity]) {
                    entity = am[entity].title || entity;
                }
            if (!entity) {
                entity = container.t('Inconnu');
            }
            error.message = container.t('Vous essayez de modifier un objet de type "{{0}}" qui à été modifié par un autre utilisateur.', entity);
        }
        return error;
    }

    public static renameJsonKey(json: any, oldKey: any, newKey: any) {
        return Object.keys(json).reduce((s, item) => item === oldKey ? ({ ...s, [newKey]: json[oldKey] }) : ({ ...s, [item]: json[item] }), {});
    }

    private static configRoutes: any;
    private static config: IAccessionRVSettings;
    private static options: IAccessionRVConfig;
    private static logger: ILogger;

    private static formatDate(date?: Date): string {
        const dateNow: Date = date || new Date();
        const y = dateNow.getFullYear();
        const m = ('0' + (dateNow.getMonth() + 1) + '').slice(-2);
        const d = ('0' + dateNow.getDate()).slice(-2);
        return y + '' + m + '' + d;
    }

    private static majParams(params: any, rolePath: string): any {
        const result: any = {};
        const roleParts: string[] = rolePath.split('.');
        for (const k of Object.keys(params)) {
            const kParts: string[] = k.split('.');
            if (kParts.length >= roleParts.length) {
                let paramOk: boolean = true;
                let i: number;
                for (i = 0; i < roleParts.length; i++) {
                    if (kParts[i] !== roleParts[i]) paramOk = false;
                }
                if (paramOk && kParts.length > i) {
                    const newParam: string[] = [];
                    for (let j = i; j < kParts.length; j++) {
                        newParam.push(kParts[j]);
                    }
                    result[newParam.join('.')] = params[k];
                }
            }
        }
        return result;
    }
}