const fs = require('fs');
const path = require('path');

const LOCK_FILES = ['package-lock.json', 'npm-shrinkwrap.json'];

module.exports = function parseLockFile(root) {
  const lockFile = LOCK_FILES.map((f) => path.join(root, f)).find((f) => fs.existsSync(f));
  if (!lockFile) throw new Error(`could not find lock file, checked ${LOCK_FILES.join(', ')}`);
  return JSON.parse(fs.readFileSync(lockFile, 'utf8'));
};
