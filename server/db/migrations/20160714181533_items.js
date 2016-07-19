exports.up = function(knex, Promise) {


  return Promise.all([
    knex.schema.createTable('games', function(table) {
        table.increments();

        table.string('title')
          .notNullable();

        table.timestamps(true, true);
      }),

      knex.schema.createTable('categories', function(table) {
        table.increments();

        table.integer('game_id')
          .notNullable()
          .references('games.id');

        table.string('title')
          .notNullable();

        table.timestamps(true, true);
      }),

      knex.schema.createTable('items', function(table) {

        table.increments();

        table.string('title')
          .notNullable();

        table.integer('game_id')
          .notNullable()
          .references('games');

        table.integer('category_id')
          .notNullable()
          .references('categories.id');

        table.timestamps(true, true);
      }),

      knex.schema.createTable('item_options', function(table) {

        table.increments();

        table.string('title')
          .notNullable();

        table.integer('item_id')
          .notNullable()
          .references('items.id');

        table.timestamps(true, true);
      }),

      knex.schema.createTable('item_option_values', function(table) {

        table.increments();

        table.string('title')
          .notNullable();

        table.integer('item_option_id')
          .notNullable()
          .references('item_options.id');

        table.timestamps(true, true);
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('games'),
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('items'),
    knex.schema.dropTable('item_options'),
    knex.schema.dropTable('item_option_values')
  ]);
};