const { Service } = require('feathers-knex');

exports.Contact = class Contact extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tbl_clienti',
      id: 'id_cliente'
    });
  }
};
