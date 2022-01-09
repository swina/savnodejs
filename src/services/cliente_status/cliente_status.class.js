const { Service } = require('feathers-knex');

exports.ClienteStatus = class ClienteStatus extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'cliente_status'
    });
  }
};
