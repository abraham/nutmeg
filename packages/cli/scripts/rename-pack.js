const fs = require('fs');
const path = require('path');
const pkg = require(path.resolve('./package.json'));

fs.renameSync(path.resolve(`./nutmeg-cli-${pkg.version}.tgz`), path.resolve(`./nutmeg-cli-latest.tgz`));
