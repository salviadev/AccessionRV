"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path = require("path");
const update_database_1 = require("./lib/tools/update-database");
commander_1.program
    .version('0.0.1', '-V, --version', 'Output version')
    .option('-c, --connectionString \'<connectionString>\'', 'Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword')
    .option('-t, --tenant <tenant>', 'Tenant (dans config.js)')
    .option('-v, --verbose', 'Verbose')
    .option('-s, --silent', 'No output, only errors')
    .option('-T, --test', 'Test only, no update')
    .option('-C, --useConfig', 'Use config.js')
    .parse();
const logLevel = commander_1.program.verbose ? update_database_1.LogLevel.VERBOSE : commander_1.program.silent ? update_database_1.LogLevel.NONE : update_database_1.LogLevel.INFO;
const options = {
    maxLogLevel: logLevel,
    connectionString: commander_1.program.connectionString,
    tenant: commander_1.program.tenant,
    logger: update_database_1.getLogger(logLevel),
    test: commander_1.program.test,
};
if (commander_1.program.useConfig) {
    const userConfigPath = path.join(__dirname, 'config.js');
    const userConfig = require(userConfigPath);
    if (userConfig.defaultDataDriver && userConfig.defaultDataDriver.SpoDirect && userConfig.defaultDataDriver.SpoDirect) {
        const connection = userConfig.defaultDataDriver.SpoDirect.options.connection;
        options.connectionString = `Server=${connection.server};Database=${connection.database};Uid=${connection.user};Pwd=${connection.password}`;
    }
    options.tenant = options.tenant || '1';
}
const ud = new update_database_1.DatabaseUpdater(options);
ud.updateDatabase()
    .then((code) => process.exit(code))
    .catch((reason) => process.exit(-1));
//# sourceMappingURL=update-database.js.map