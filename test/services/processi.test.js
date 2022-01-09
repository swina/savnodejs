const assert = require('assert');
const app = require('../../src/app');

describe('\'processi\' service', () => {
  it('registered the service', () => {
    const service = app.service('processi');

    assert.ok(service, 'Registered the service');
  });
});
