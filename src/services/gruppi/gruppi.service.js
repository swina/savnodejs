// Initializes the `tbl_persone` service on path `/tbl-persone`
const { Gruppi } = require('./gruppi.class');
const createModel = require('../../models/gruppi.model');
const hooks = require('./gruppi.hooks');

module.exports = function (app) {
  const options = {
    id: 'id_gruppo',
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gruppi', new Gruppi(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gruppi');

  service.hooks(hooks);
};
