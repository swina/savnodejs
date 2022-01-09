const assert = require('assert');
const app = require('../../src/app');

describe('\'tbl_persone\' service', () => {
  it('registered the service', () => {
    const service = app.service('tbl-persone');

    assert.ok(service, 'Registered the service');
  });
});
