
const { authenticate } = require('@feathersjs/authentication').hooks;
const contact = require('../../hooks/contact');

module.exports = {
  before: {
    all: [],
    find: [contact()],
    get: [authenticate('jwt')],
    create: [contact()],
    update: [authenticate('jwt'),contact()],
    patch: [authenticate('jwt'),contact()],
    remove: [authenticate('jwt'),contact()]
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
