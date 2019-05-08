module.exports = function convertToTree(lockFile) {
  const tree = createTree(lockFile.name, lockFile);
  // assume the root project requires all of its children
  tree.children.forEach((child) => {
    tree.requires[child.name] = child.version;
  });
  return tree;
};

function createTree(pkgName, pkgInfo) {
  const node = {
    name: pkgName,
    version: pkgInfo.version,
    requires: pkgInfo.requires && typeof pkgInfo.requires === 'object' ? pkgInfo.requires : {},
    parent: undefined,
    children: [],
  };
  if (pkgInfo.dependencies) {
    node.children = Object.entries(pkgInfo.dependencies).map(([name, info]) => {
      const child = createTree(name, info);
      child.parent = node;
      return child;
    });
  }
  return node;
}
