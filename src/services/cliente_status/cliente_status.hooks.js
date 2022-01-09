const { authenticate } = require('@feathersjs/authentication').hooks;

const clienteStatus = require('../../hooks/cliente_status');

module.exports = {
  before: {
    all: [authenticate('jwt') ],//authenticate('jwt')
    find: [clienteStatus()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
