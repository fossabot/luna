//run shell commands

'use strict';

const cp = require('child_process');
const utils = require('./utils');
const exec = cp.exec;
const spawn = cp.spawn;

const defaults = ['--depth=0', '--json'];

exports.getPackages = (options, cd) => {
  const opts = options || {}
  const scope = opts.scope || '-g';
  const cmd = 'list';

  let run=[cmd], params=[], args = [];

  if(opts.arguments) {
    for(let z in opts.arguments) {
      let v = opts.arguments[z];
      args.push(`--${z}=${v}`);
    }
  } else {
    args = defaults.concat();
  }

  console.log(run.concat(params).concat(opts));
  return 1;

  let npmc = spawn('npm', run.concat(params).concat(opts), {
    maxBuffer: 1024 * 500
  });

  npmc.stdout.on('data', (data) => {
    result+=data.toString();
    cb(data.toString(), 'reply');
  });
  npmc.stderr.on('data', (data) => {
    cb(data.toString(), 'error');
  });
  npmc.on('close', () => {
    console.log(`npm ${run.join(" ")} ${params.join(" ")} ${opts.join(" ")} finished execution`);
    cb(result, 'close');
  });
}

exports.doCmd = function(cmd, options, cb) {
  const defaults = ['--depth=0', '--json'];

  if(!cmd) {
    throw new Error('shell->doCmd: Missing cmd parameter');
  }

  let run=[cmd], params=[], opts=[];
  let pkgName = options.pkgName;
  let pkgVersion = options.pkgVersion;
  let result = '';

  if(pkgName && pkgVersion) {
    run.push(`${pkgName}@${pkgVersion}`);
  } else if(pkgName) {
    run.push(`${pkgName}`);
  }

  if(options.scope) {
    params.push(`-${options.scope}`);
  }

  if(options.arguments) {
    for(let z in options.arguments) {
      let v = options.arguments[z];
      opts.push(`--${z}=${v}`);
    }
  } else {
    opts = defaults.concat();
  }

  let npmc = spawn('npm', run.concat(params).concat(opts), {
    maxBuffer: 1024 * 500
  });

  npmc.stdout.on('data', (data) => {
    result+=data.toString();
    cb(data.toString(), 'reply');
  });
  npmc.stderr.on('data', (data) => {
    cb(data.toString(), 'error');
  });
  npmc.on('close', () => {
    console.log(`npm ${run.join(" ")} ${params.join(" ")} ${opts.join(" ")} finished execution`);
    cb(result, 'close');
  });
}
