#!/usr/bin/env node
const getLockfileDeps = require('./api');

function parseArgs(argv) {
  const argEndIndex = argv.includes('--') ? argv.indexOf('--') : argv.length;
  const args = argv.slice(2, argEndIndex);
  const help = args.find((arg) => arg.startsWith('--help') || arg.startsWith('-h'));
  const pkgs = args.filter((arg) => !arg.startsWith('-'));
  return {
    help,
    pkgs,
  };
}

const root = process.cwd();
const { pkgs, help } = parseArgs(process.argv);

if (help) {
  console.log('Usage: lockfile-deps [[@scope/]<package> [@scope/]<package> ...]');
} else {
  pkgs.forEach((pkg) => {
    const deps = getLockfileDeps(root, pkg);
    console.log(JSON.stringify(deps, null, 2));
  });
}
