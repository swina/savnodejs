const assert = require('assert');
const app = require('../../src/app');

describe('\'cliente_status\' service', () => {
  it('registered the service', () => {
    const service = app.service('cliente/status');

    assert.ok(service, 'Registered the service');
  });
});
