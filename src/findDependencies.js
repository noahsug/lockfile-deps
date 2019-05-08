const semver = require('semver');

const findPackage = require('./findPackage');

module.exports = function findDependencies(tree, pkgName) {
  const pkgNode = findPackage(tree, pkgName);
  const depSet = new Set();
  recursivelyAddDependencies(pkgNode, depSet);
  return Array.from(depSet);
};

function recursivelyAddDependencies(node, depSet) {
  if (depSet.has(node)) return;
  depSet.add(node);
  Object.entries(node.requires).forEach(([name, constraint]) => {
    const dep = findMatchingDependency(node, { name, constraint: fixVersionRange(constraint) });
    recursivelyAddDependencies(dep, depSet);
  });
}

// remove leading 0's in version constraints: "~1.01.00" -> "~1.1.0", npm allows this, but semver
// does not
function fixVersionRange(constraint) {
  return constraint.replace(/\.0+(\d)/g, '.$1');
}

// starting from the given node, search its children for a package meeting the given criteria, then
// move to that node's parent, and recurse
function findMatchingDependency(node, criteria) {
  if (!node) throw new Error('failed to find node matching criteria:', criteria);
  if (satisfies(node, criteria)) return node;
  const childDep = node.children.find((child) => satisfies(child, criteria));
  if (childDep) return childDep;
  return findMatchingDependency(node.parent, criteria);
}

function satisfies(node, { name, constraint }) {
  return node.name === name && semver.satisfies(node.version, constraint);
}
