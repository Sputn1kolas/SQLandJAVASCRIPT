
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('famous_people', function(table){
      table.string('description')
      table.date('date');
    })
  ])
};


exports.down = function(knex, Promise) {
 return Promise.all([
    knex.schema.table('famous_people', function(table){
      table.dropColumn('description')
      table.dropColumn('date');
    })
  ])
};