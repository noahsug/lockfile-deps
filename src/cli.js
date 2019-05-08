#!/usr/bin/env node
const getLockfileDeps = require('./api');

function parseArgs(argv) {
  const argEndIndex = argv.includes('--') ? argv.indexOf('--') : argv.length;
  const args = argv.slice(2, argEndIndex);
  const help = args.find((arg) => arg.startsWith('--help') || arg.startsWith('-h'));
  const pkg = args.find((arg) => !arg.startsWith('-'));
  return {
    help,
    pkg,
  };
}

const root = process.cwd();
const { pkg, help } = parseArgs(process.argv);

if (help) {
  console.log('Usage: lockfile-deps [@scope/]<package>');
} else {
  const deps = getLockfileDeps(root, pkg);
  console.log(JSON.stringify(deps, null, 2));
}
