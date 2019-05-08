const findDependencies = require('./findDependencies');
const convertToTree = require('./convertToTree');
const parseLockFile = require('./parseLockFile');

function nameAndVersionCompare(dep1, dep2) {
  const key1 = [dep1.name, dep1.version].join(' ');
  const key2 = [dep2.name, dep2.version].join(' ');
  return key1.localeCompare(key2);
}

module.exports = function getLockfileDeps(root, pkg = null) {
  const lockFile = parseLockFile(root);
  pkg = pkg || lockFile.name;
  const tree = convertToTree(lockFile);
  const deps = findDependencies(tree, pkg);
  return deps.map(({ name, version }) => ({ name, version })).sort(nameAndVersionCompare);
};
