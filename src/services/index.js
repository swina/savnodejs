const users = require('./users/users.service.js');
const clienti = require('./clienti/clienti.service.js');
const status = require('./status/status.service.js');
const tblPersone = require('./tbl_persone/tbl_persone.service.js');
const clienteStatus = require('./cliente_status/cliente_status.service.js');
const processi = require('./processi/processi.service.js');
const gruppi = require('./gruppi/gruppi.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(clienti);
  app.configure(status);
  app.configure(tblPersone);
  app.configure(clienteStatus);
  app.configure(processi);
  app.configure(gruppi);
};
