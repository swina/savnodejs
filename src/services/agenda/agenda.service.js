// Initializes the `agenda` service on path `/agenda`
const { Agenda } = require('./agenda.class');
const createModel = require('../../models/agenda.model');
const hooks = require('./agenda.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/agenda', new Agenda(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('agenda');

  service.hooks(hooks);
};
