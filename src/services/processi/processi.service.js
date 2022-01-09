// Initializes the `processi` service on path `/processi`
const { Processi } = require('./processi.class');
const createModel = require('../../models/processi.model');
const hooks = require('./processi.hooks');

module.exports = function (app) {
  const options = {
    id: 'id_processo',
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/processi', new Processi(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('processi');

  service.hooks(hooks);
};
