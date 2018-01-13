import * as path from 'path';
import * as program from 'commander';
import * as shell from 'shelljs';

import { isNutmegComponent, exit } from './utils';

program.command('test <path>', 'test a Web Component')
       .parse(process.argv);

const nutmegDir = path.resolve(process.argv[1], '../..');
const workingDir = path.resolve(program.args[0]);

const karmaConfigFile = path.resolve(nutmegDir, 'karma.component.config.js');
const karmaCmd = `karma start ${karmaConfigFile}`;

exit("Directory doesn't have a package.json with @nutmeg/element as a dependancy.", !isNutmegComponent(workingDir));

const result = shell.exec(`npx ${karmaCmd}`);
process.exit(result.code);
