exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tokens', function(table) {
      table.timestamps(true, true);
      table.increments();

      table.string('tokenable_type')
        .notNullable();

      table.integer('tokenable_id')
        .notNullable();

      table.boolean('retrieved ')
        .notNullable()
        .defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('tokens');
};
