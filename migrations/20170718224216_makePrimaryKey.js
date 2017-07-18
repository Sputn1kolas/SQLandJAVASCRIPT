
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.string('description')
      table.date('date');
      table.integer('famous_person_id').references('id').inTable('famous_people')
    })
  ])
  console.log("migrating...")
};


exports.down = function(knex, Promise) {
 // return Promise.all([
 //    knex.schema.dropTable('milestones', function(table){
 //    })
 //  ])
};