const getLockfileDeps = require('./api');

it('prints package dependencies and versions from npm-shrinkwrap.json', () => {
  expect(getLockfileDeps('test/fixtures/nsp', 'catbox')).toEqual([
    { name: 'boom', version: '5.2.0' },
    { name: 'catbox', version: '7.1.5' },
    { name: 'hoek', version: '4.2.1' },
    { name: 'isemail', version: '2.2.1' },
    { name: 'items', version: '2.1.1' },
    { name: 'joi', version: '10.6.0' },
    { name: 'topo', version: '2.0.2' },
  ]);
});

it('prints package dependencies and versions from package-lock.json', () => {
  expect(getLockfileDeps('test/fixtures/npm', 'rimraf')).toEqual([
    { name: 'balanced-match', version: '1.0.0' },
    { name: 'brace-expansion', version: '1.1.11' },
    { name: 'concat-map', version: '0.0.1' },
    { name: 'fs.realpath', version: '1.0.0' },
    { name: 'glob', version: '7.1.3' },
    { name: 'inflight', version: '1.0.6' },
    { name: 'inherits', version: '2.0.3' },
    { name: 'minimatch', version: '3.0.4' },
    { name: 'once', version: '1.4.0' },
    { name: 'path-is-absolute', version: '1.0.1' },
    { name: 'rimraf', version: '2.6.2' },
    { name: 'wrappy', version: '1.0.2' },
  ]);
});

it('prints root package dependencies and versions', () => {
  const deps = getLockfileDeps('test/fixtures/npm');
  expect(deps.length).toBe(973);
  expect(deps[0]).toEqual({ name: '@iarna/cli', version: '2.0.0' });
  expect(deps[1]).toEqual({ name: '@types/caseless', version: '0.12.1' });
  expect(deps[2]).toEqual({ name: '@types/form-data', version: '2.2.1' });
});
