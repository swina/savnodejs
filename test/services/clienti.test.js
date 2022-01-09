const assert = require('assert');
const app = require('../../src/app');

describe('\'clienti\' service', () => {
  it('registered the service', () => {
    const service = app.service('clienti');

    assert.ok(service, 'Registered the service');
  });
});
