"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const update_database_1 = require("./lib/tools/update-database");
commander_1.program
    .version('0.0.1', '-V, --version', 'Output version')
    .option('-c, --connectionString \'<connectionString>\'', 'Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword')
    .option('-s, --schemaName \'<schemaName>\'', 'Schema name')
    .option('-o, --output  \'<output>\'', ' Output directory')
    .option('-v, --verbose', 'Verbose')
    .parse();
const logLevel = commander_1.program.verbose ? update_database_1.LogLevel.VERBOSE : commander_1.program.silent ? update_database_1.LogLevel.NONE : update_database_1.LogLevel.INFO;
const options = {
    maxLogLevel: logLevel,
    connectionString: commander_1.program.connectionString,
    tenant: '1',
    schemaName: commander_1.program.schemaName,
    logger: update_database_1.getLogger(logLevel),
    outputDir: commander_1.program.output,
    test: false,
};
const ud = new update_database_1.DatabaseUpdater(options);
ud.db2schema()
    .then((code) => process.exit(code))
    .catch((reason) => process.exit(-1));
//# sourceMappingURL=database2schema.js.map