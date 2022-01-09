const { authenticate } = require('@feathersjs/authentication').hooks;

const clienti = require('../../hooks/clienti');
const clientiErrors = require( '../../hooks/clienti.error.js' );
const clienteCreato = require('../../hooks/clienti.creato');
module.exports = {
  before: {
    all: [ ], //authenticate('jwt') 
    find: [],
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
    create: [clienteCreato()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [clientiErrors()],
    update: [],
    patch: [],
    remove: []
  }
};
