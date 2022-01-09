// Initializes the `clienti` service on path `/clienti`
const { Clienti } = require('./clienti.class');
const createModel = require('../../models/clienti.model');
const hooks = require('./clienti.hooks');

module.exports = function (app) {
  const options = {
    id: 'id_cliente',
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/clienti', new Clienti(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('clienti');

  service.hooks(hooks);
};
