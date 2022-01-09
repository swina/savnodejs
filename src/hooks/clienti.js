// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    console.log ( 'Request from => ' , context.params.query );
    const id_cliente = context.params.query.id_cliente || null;
    const skip = context.params.query.skip || 0;
    const limit = context.params.query.limit || 50;
    const filtro = '';
    const operatore = 'WHERE';
    if ( id_cliente ) {
      filtro = `${operatore} tbl_clienti = ${id_cliente}`
    }
    const db = context.app.get('knexClient');
    const sql = db.raw(`Select
    tbl_persone.id_gruppo,
    tbl_persone.ac_cognome AS agente,
    tbl_clienti.*,
    tbl_gruppi_clienti.id_gruppo AS id_gruppo_clienti,
    tbl_gruppi_clienti.ac_icona,
    tbl_gruppi_clienti.ac_gruppo AS qualifica,
    tbl_gruppi.id_gruppo AS gruppo
    From
    tbl_clienti
    INNER JOIN tbl_persone ON tbl_clienti.id_agente = tbl_persone.id_persona
    LEFT JOIN tbl_gruppi_clienti ON tbl_clienti.id_qualifica = tbl_gruppi_clienti.id_gruppo
    INNER JOIN tbl_gruppi ON tbl_persone.id_gruppo = tbl_gruppi.id_gruppo
    ${filtro}
    ORDER BY tbl_clienti.dt_data_registrazione DESC
    LIMIT ${skip},${limit}`);
    const res = await sql;
    context.result = res;
    return context;
    // } else {
    //   return context;
    // }
  };
};
