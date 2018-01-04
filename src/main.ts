import program = require('commander');
const version = require('../package.json')['version'];

program
  .version(version)
  .usage('new <name> [property:type...]')
  .command('new <name> [property:type...]', 'generate a Web Component')
  .command('build [path]', 'compile a Web Component')
  .command('watch [path]', 'run build on file changes')
  .command('serve [path]', 'start and open a dev server')
  .command('test [path]', 'test a Web Component');

program.parse(process.argv);
