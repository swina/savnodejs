// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const id_cliente = context.params.query.id_cliente || null;
    const dt_from = context.params.query.dt_from || null
    const dt_to = context.params.query.dt_to || null
    const skip = context.params.query.skip || 0;
    const limit = context.params.query.limit || context.app.get('paginate').default;
    let filtro = '';
    let operatore = 'WHERE';
    if ( id_cliente ) {
      filtro = `${operatore} tbl_clienti.id_cliente = ${id_cliente}`
      operatore = ' AND '
    }
    if ( dt_from && dt_to ){
      filtro += `${operatore} ( DATE_FORMAT(tbl_clienti.dt_data_registrazione,'%Y%m%d') >= "${dt_from}" AND DATE_FORMAT(tbl_clienti.dt_data_registrazione,'%Y%m%d') <=  "${dt_to}" )`;
      operatore = ' AND '
    }
    const db = context.app.get('knexClient');
    const totalSQL = db.raw("Select COUNT(id_cliente) as total from tbl_clienti WHERE bl_cancellato=0");
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
    const total = await totalSQL;
    console.log ( 'filtro clienti -------------: ' , filtro , context.params.query )
    console.log ( sql )
    context.result = { total: total[0][0].total , skip: skip , limit: limit , data : res[0]  };
    return context;
    // } else {
    //   return context;
    // }
  };
};
