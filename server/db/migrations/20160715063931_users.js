exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments();

      table.string('firstName')
        .notNullable();

      table.string('lastName')
        .notNullable();

      table.string('passwordHash')
        .notNullable();

      table.string('passwordSalt')
        .notNullable();

      table.string('emailAddress')
        .unique()
        .notNullable();

      table.boolean('emailConfirmed')
        .notNullable()
        .defaultTo(false);

      table.string('confirmationToken')
        .notNullable();

      table.boolean('status')
        .notNullable()
        .defaultTo(false);

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
