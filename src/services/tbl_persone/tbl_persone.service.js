// Initializes the `tbl_persone` service on path `/tbl-persone`
const { TblPersone } = require('./tbl_persone.class');
const createModel = require('../../models/tbl_persone.model');
const hooks = require('./tbl_persone.hooks');

module.exports = function (app) {
  const options = {
    id: 'id_persona',
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/agenti', new TblPersone(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('agenti');

  service.hooks(hooks);
};
