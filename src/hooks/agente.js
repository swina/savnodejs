module.exports = (options = {}) => {
    return async context => {
        console.log ( 'Agenti find=>' , context.params.query );
        if ( context.params.query.account ){
            const db = context.app.get('knexClient');
            let sql = db.raw ( `
                SELECT 
                    tbl_persone.id_persona, 
                    tbl_persone.ac_cognome,
                    tbl_persone.ac_nome,
                    tbl_persone.ac_telefono,
                    tbl_gruppi.ac_gruppo , 
                    tbl_gruppi.int_livello 
                FROM tbl_persone 
                INNER JOIN tbl_gruppi ON tbl_persone.id_gruppo = tbl_gruppi.id_gruppo
                WHERE tbl_persone.ac_email = "${context.params.query.account}"
            `);
            const res = await sql;
            context.result = res;
            return context
        } else {
            return context;
        }
    };
};