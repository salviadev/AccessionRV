import { program } from 'commander';
import * as path from 'path';
import { IDatabaseUpdateOptions, LogLevel, getLogger, DatabaseUpdater } from './lib/tools/update-database';

program
    .version('0.0.1', '-V, --version', 'Output version')
    .option('-c, --connectionString \'<connectionString>\'', 'Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword')
    .option('-t, --tenant <tenant>', 'Tenant (dans config.js)')
    .option('-v, --verbose', 'Verbose')
    .option('-s, --silent', 'No output, only errors')
    .option('-T, --test', 'Test only, no update')
    .option('-C, --useConfig', 'Use config.js')
    .parse();

const logLevel = program.verbose ? LogLevel.VERBOSE : program.silent ? LogLevel.NONE : LogLevel.INFO;
const options: IDatabaseUpdateOptions = {
    maxLogLevel: logLevel,
    connectionString: program.connectionString,
    tenant: program.tenant,
    logger: getLogger(logLevel),
    test: program.test,
};
if (program.useConfig) {
    const userConfigPath = path.join(__dirname, 'config.js');
    const userConfig = require(userConfigPath); // eslint-disable-line @typescript-eslint/no-var-requires
    if (userConfig.defaultDataDriver && userConfig.defaultDataDriver.SpoDirect &&  userConfig.defaultDataDriver.SpoDirect) {
        const connection = userConfig.defaultDataDriver.SpoDirect.options.connection;
        options.connectionString = `Server=${connection.server};Database=${connection.database};Uid=${connection.user};Pwd=${connection.password}`;
    }
    options.tenant = options.tenant || '1';
}
const ud = new DatabaseUpdater(options);
ud.updateDatabase()
    .then((code) => process.exit(code))
    .catch((reason) => process.exit(-1));
