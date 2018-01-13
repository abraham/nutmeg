import * as program from 'commander';

import { notifyOfUpdate } from './utils';

const pkg = require('../package.json');

notifyOfUpdate();

program.version(pkg.version)
       .usage('new <copmonent-name> [property:type...]')
       .command('build <path>', 'compile a Web Component')
       .command('clean <path>', "clean a Web Component's compiled files")
       .command('new <copmonent-name> [property:type...]', 'generate a Web Component')
       .command('serve <path>', 'start and open a dev server')
       .command('test <path>', 'test a Web Component')
       .command('watch <path>', 'run build on file changes');

program.parse(process.argv);
