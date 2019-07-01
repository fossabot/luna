/* eslint-disable compat/compat */
/* eslint-disable import/prefer-default-export */

import log from 'electron-log';
import manager from './manager';

/**
 * Run shell commands
 * @param {*} options
 * @param {*} callback
 */

const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  const combine = () =>
    cmd.map((command, idx) => {
      try {
        const runner = manager[command];
        const result = runner(rest, callback, idx);

        return result;
      } catch (error) {
        log.error(error);
        throw new Error(error);
      }
    });

  const tasks = combine();

  Promise.all(tasks)
    .then(results => results.forEach(result => callback(result)))
    .catch(error => Promise.reject(error));
};

export default runCommand;
