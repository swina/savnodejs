const { authenticate } = require('@feathersjs/authentication').hooks;
const agenda = require('../../hooks/agenda');
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [agenda()],
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
