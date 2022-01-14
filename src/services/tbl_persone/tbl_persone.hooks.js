const { authenticate } = require('@feathersjs/authentication').hooks;
const  agenti  = require('../../hooks/agente.js');
module.exports = {
  before: {
    all: [authenticate('jwt')],//authenticate('jwt') 
    find: [agenti()],
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
