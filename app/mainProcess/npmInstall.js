import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';
import mk from '../mk';

const {
  defaultSettings: { defaultManager }
} = mk || {};

const onNpmInstall = (event, options, store) => {
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = options || {};
  const commands = options.cmd;

  let runningTimes = 1;

  const onFlow = chunk => event.sender.send('npm-install-flow', chunk);
  const onError = error => event.sender.send('npm-install-error', error);

  const onComplete = (errors, data, cmd) => {
    if (commands.length === runningTimes) {
      runningTimes = 1;
      return event.sender.send('npm-install-completed', data, errors, cmd);
    }

    runningTimes += 1;
  };

  const callback = result => {
    const { status, errors, data, cmd } = result;

    return switchcase({
      flow: dataChunk => onFlow(dataChunk),
      close: () => onComplete(errors, data, cmd),
      error: error => onError(error)
    })(null)(status);
  };

  try {
    const params = merge(settings, {
      activeManager,
      ...rest
    });

    runCommand(params, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-install-error', error);
  }
};

export default onNpmInstall;
