import program = require('commander');
const version = require('../package.json')['version'];

program
  .version(version)
  .usage('new <name> [property:type...]')
  .command('new <name> [property:type...]', 'generate a Web Component');

program.parse(process.argv);
