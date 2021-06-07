import { program } from 'commander';
import { IDatabaseUpdateOptions, LogLevel, getLogger, DatabaseUpdater } from './lib/tools/update-database';

program
    .version('0.0.1', '-V, --version', 'Output version')
    .option('-c, --connectionString \'<connectionString>\'', 'Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword')
    .option('-s, --schemaName \'<schemaName>\'', 'Schema name')
    .option('-o, --output  \'<output>\'', ' Output directory')
    .option('-v, --verbose', 'Verbose')
    .parse();

const logLevel = program.verbose ? LogLevel.VERBOSE : program.silent ? LogLevel.NONE : LogLevel.INFO;
const options: IDatabaseUpdateOptions = {
    maxLogLevel: logLevel,
    connectionString: program.connectionString,
    tenant: '1',
    schemaName: program.schemaName,
    logger: getLogger(logLevel),
    outputDir: program.output,
    test: false,
};
const ud = new DatabaseUpdater(options);
ud.db2schema()
    .then((code) => process.exit(code))
    .catch((reason) => process.exit(-1));
