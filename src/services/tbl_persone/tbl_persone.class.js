const { Service } = require('feathers-knex');

exports.TblPersone = class TblPersone extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tbl_persone'
    });
  }
};
