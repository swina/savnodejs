/* eslint-disable no-console */
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'tbl_gruppi';
  
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('text');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    } 
  });
  

  return db;
};
