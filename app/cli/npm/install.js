/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm install
 * @param {*} options
 * @param {*} idx
 */
const install = (options, idx) => {
  const command = ['install'];
  const {
    mode,
    version,
    name,
    pkgOptions,
    multiple,
    packages,
    single,
    packageJson
  } = options || {};

  // '--ignore-scripts
  // '--verbose'
  // '--no-shrinkwrap'
  const defaults = ['--no-shrinkwrap'];
  let packagesToInstall;

  // install from package.json file
  if (packageJson) {
    return command.concat(['--ignore-scripts']);
  }

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;

  // handle installation of a single package
  if (single) {
    packagesToInstall = version ? [`${name}@${version}`] : [name];
  }

  // handle installation of multiple packages
  if (multiple && packages && !single) {
    if (idx > -1 && packages.length > 1) {
      packagesToInstall = packages[idx];
    } else {
      packagesToInstall = packages;
    }
  }

  // set installation options
  const hasOptions = Array.isArray(pkgOptions) && pkgOptions.length;
  const commandOptions =
    mode === 'local' && hasOptions
      ? multiple
        ? pkgOptions[idx].map(option => `--${option}`)
        : pkgOptions.map(option => `--${option}`)
      : ['--save-prod'];

  // build running command
  const run = []
    .concat(command)
    .concat(packagesToInstall)
    .concat(commandOptions)
    .concat(commandArgs);

  return run;
};

export default install;
