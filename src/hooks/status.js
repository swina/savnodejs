// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const skip = context.params.query.skip || 0;
    const limit = context.params.query.$limit || 20;
    const id_cliente = context.params.query.id_cliente || null; 
    const id_persona = context.params.query.id_persona || null;
    const id_processo = context.params.query.id_processo || null;
    const dt_from = context.params.query.dt_from || null;
    const dt_to = context.params.query.dt_to || null;
    const custom = context.params.query.params || null
    let operator = 'AND '
    let order = 'DESC'
    let filter = ''
    if ( id_persona ){
      filter = `${operator} tbl_persone.id_persona = ${id_persona}`;
      operator = ' AND ';
    }
    if ( id_processo ){
      filter += `${operator} tbl_status.id_processo = ${id_processo}`;
      operator = ' AND '; 
    }
    if ( dt_from ){
      filter += `${operator} DATE_FORMAT(dt_status,'%Y%m%d') >= "${dt_from}"`;
      operator = ' AND '
    }
    if ( dt_to ){
      filter += `${operator} DATE_FORMAT(dt_status,'%Y%m%d') <= "${dt_to}"`;
      operator = ' AND '
    }
    if ( context.params.query.params && context.params.query.params === 'alert' ){
      let from = new Date();
      let to = new Date();
      let dateFrom = new Date(from.setDate(from.getDate() - 3));
      let dateTo = new Date(to.setDate(to.getDate() - 1));
      dateTo = dateTo.toISOString().split('T')[0]
      dateFrom = dateFrom.toISOString().split('T')[0]
      filter = `AND ( DATE_FORMAT(dt_status,'%Y-%m-%d') <= "${dateTo}" AND  DATE_FORMAT(dt_status,'%Y-%m-%d') >= "${dateFrom}") AND ( tbl_processi.int_postalert > 0 )`
      order = 'ASC'
    }
    if ( !filter ){
      let to = new Date();
      let dateTo = new Date(to.setDate(to.getDate() - 1));
      dateTo = dateTo.toISOString().split('T')[0]
      filter = ` AND DATE_FORMAT(dt_status,'%Y-%m-%d') <= "${dateTo}"`
      order = 'DESC'
    }
    //console.log ( 'Filtro Status => ' , filter );
    const db = context.app.get('knexClient');
      const sql = db.raw ( `
          SELECT  
            tbl_status.id_status,
            DATE_FORMAT ( tbl_status.dt_status , '%d/%m/%Y') AS data_status,
            DATE_FORMAT ( tbl_status.dt_status , '%H:%i') AS ora_status,
            tbl_status.dt_status,
            tbl_clienti.id_cliente,
            tbl_clienti.ac_cognome,
            tbl_clienti.ac_nome,
            tbl_clienti.ac_segnalatore,
            tbl_clienti.ac_citta,
            tbl_clienti.id_agente,
            tbl_clienti.id_qualifica AS qualifica,
            tbl_persone.ac_cognome AS agente,
            tbl_processi.ac_processo,
            tbl_processi.ac_sigla AS sigla,
            tbl_processi.ac_colore,
            tbl_processi.int_postalert,
            tbl_gruppi_clienti.ac_icona
          FROM tbl_status 
          INNER JOIN tbl_clienti ON tbl_status.id_cliente = tbl_clienti.id_cliente
          INNER JOIN tbl_persone ON tbl_clienti.id_agente = tbl_persone.id_persona
          INNER JOIN tbl_processi ON tbl_status.id_processo = tbl_processi.id_processo
          INNER JOIN tbl_gruppi ON tbl_clienti.id_qualifica = tbl_gruppi.id_gruppo
          LEFT JOIN tbl_gruppi_clienti ON tbl_clienti.id_qualifica = tbl_gruppi_clienti.id_gruppo
          WHERE (id_status) IN (
            SELECT   MAX(id_status)
            FROM     tbl_status
            GROUP BY tbl_status.id_cliente
          )
          ${filter}
          ORDER BY dt_status ${order} LIMIT ${skip},${limit}`);
        const res = await sql;
        console.log ( context.params.query )
        context.result = res;
        return context;
  };
};
