// breadth-first search down the tree for the given package
module.exports = function findPackage(tree, pkgName) {
  const queue = [tree];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node.name === pkgName) return node;
    queue.push(...node.children);
  }
  throw new Error(`"${pkgName}" does not exist in lock file`);
};
