const app = require('../../src/app');

describe('\'agenda\' service', () => {
  it('registered the service', () => {
    const service = app.service('agenda');
    expect(service).toBeTruthy();
  });
});
