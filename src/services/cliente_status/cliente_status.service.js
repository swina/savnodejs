// Initializes the `cliente_status` service on path `/cliente/status`
const { ClienteStatus } = require('./cliente_status.class');
const createModel = require('../../models/cliente_status.model');
const hooks = require('./cliente_status.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cliente/status', new ClienteStatus(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cliente/status');

  service.hooks(hooks);
};
