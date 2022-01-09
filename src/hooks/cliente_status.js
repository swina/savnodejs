// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    console.log ( context.params.query )
    const skip = context.params.query.skip || 0;
    const limit = context.params.query.limit || 20;
    const id_cliente = context.params.query.id_cliente || null; 
    if ( id_cliente ){
      const db = context.app.get('knexClient');
      const sql = db.raw(`SELECT 
        tbl_status.id_status,
        tbl_status.id_cliente AS idc,
        tbl_status.dt_status,
        DATE_FORMAT(tbl_status.dt_status,'%d/%m/%Y') AS data_status,
        DATE_FORMAT(tbl_status.dt_status,'%H:%i') AS ora_status,
        DATE_FORMAT(tbl_status.dt_status,'%Y-%m-%d %H:%i:%s') AS data_ora_status,
        tbl_status.ac_note,
        tbl_status.ac_docs,
        tbl_status.ac_modulo_uuid,
        tbl_status.id_persona,
        tbl_status.id_persona AS ut,
        tbl_status.bl_attivo,
        tbl_clienti.id_cliente,
        tbl_clienti.ac_cognome,
        tbl_clienti.ac_nome,
        tbl_clienti.ac_citta,
        tbl_clienti.ac_indirizzo,
        tbl_clienti.ac_telefono,
        tbl_clienti.ac_segnalatore,
        tbl_clienti.ac_email,
        tbl_gruppi_clienti.id_gruppo AS id_qualifica,
        tbl_gruppi_clienti.ac_icona,
        tbl_gruppi_clienti.ac_gruppo AS qualifica,
        tbl_processi.id_processo,
        tbl_processi.ac_processo,
        tbl_processi.ac_sigla,
        tbl_processi.ac_colore,
        tbl_persone.ac_cognome AS agente,
        tbl_gruppi.id_gruppo AS id_gruppo
        FROM tbl_status
        Inner Join tbl_processi ON tbl_processi.id_processo = tbl_status.id_processo
        Inner Join tbl_clienti ON tbl_status.id_cliente = tbl_clienti.id_cliente
        INNER JOIN tbl_persone ON tbl_clienti.id_agente = tbl_persone.id_persona
        LEFT JOIN tbl_gruppi_clienti ON tbl_clienti.id_qualifica = tbl_gruppi_clienti.id_gruppo
        INNER JOIN tbl_gruppi ON tbl_persone.id_gruppo = tbl_gruppi.id_gruppo
        WHERE tbl_status.id_cliente = ${id_cliente}
        ORDER BY dt_status DESC
        LIMIT ${skip},${limit}`);
        const res = await sql;
        context.result = res;
        return context;
    }
  };
};
