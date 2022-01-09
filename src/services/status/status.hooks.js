const { authenticate } = require('@feathersjs/authentication').hooks;

const status = require('../../hooks/status');

module.exports = {
  before: {
    all: [ ], //authenticate('jwt') 
    find: [status()],
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
