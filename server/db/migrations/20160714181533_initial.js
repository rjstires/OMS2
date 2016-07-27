exports.up = function(knex, Promise) {

  const optionTypes = knex.schema.createTable('option_types', function(t) {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.integer('optionable_id').notNullable();
    t.string('optionable_type').notNullable();
    t.timestamps(true, true);
  });

  const optionValues = knex.schema.createTable('option_values', function(t) {
    t.increments('id').primary();
    t.string('value').notNullable();
    t.integer('option_type_id').references('option_types.id');
    t.timestamps(true, true);
  });

  const teams = knex.schema.createTable('teams', function(t) {
    t.increments('id').primary();
    t.string('name').notNullable().unique();
    t.string('payment_address').notNullable();
    t.string('alias').unique();
    t.timestamps(true, true);
  });

  const memberships = knex.schema.createTable('memberships', function(t) {
    t.increments('id').primary();
    t.integer('team_id').notNullable().references('teams.id');
    t.integer('user_id').notNullable().references('users.id');
    t.boolean('confirmed').defaultTo(false).notNullable();
    t.boolean('owner').defaultTo(false).notNullable();
    t.timestamps(true, true);
  });

  const characters = knex.schema.createTable('characters', function(t) {
    t.increments('id').primary();
    t.timestamps(true, true);
  });

  const customers = knex.schema.createTable('customers', function(t) {
    t.increments('id').primary();
    t.string('emailAddress').notNullable().unique();
    t.timestamps(true, true);
  });

  const events = knex.schema.createTable('events', function(t) {
    t.increments('id').primary();
    t.dateTime('event_timestamp').notNullable();
    t.dateTime('cutoff_timestamp').notNullable();
    t.integer('team_id').references('teams.team_id');
    t.timestamps(true, true);
  });

  const eventSlot = knex.schema.createTable('event_slots', function(t) {
    t.increments('id').primary();
    t.string('description');
    t.integer('item_id').notNullable().references('items.item_id');
    t.timestamps(true, true);
  });

  const contact_types = knex.schema.createTable('contact_types', function(t) {
    t.increments('id').primary();
    t.string('value').notNullable();
    t.timestamps(true, true);
  });

  const contacts = knex.schema.createTable('contacts', function(t) {
    t.increments('id').primary();
    t.string('value').notNullable();
    t.integer('contact_type_id').references('contact_types.id');
    t.string('contactable_type').notNullable();
    t.integer('contactable_id').notNullable();
    t.timestamps(true, true);
  });

  const users = knex.schema.createTable('users', function(t) {
    t.increments('id').primary();
    t.string('firstName').notNullable();
    t.string('lastName').notNullable();
    t.string('passwordHash').notNullable();
    t.string('passwordSalt').notNullable();
    t.string('emailAddress').unique().notNullable();
    t.boolean('emailConfirmed').notNullable().defaultTo(false);
    t.string('confirmationToken').notNullable();
    t.boolean('status').notNullable().defaultTo(false);
    t.timestamps(true, true);
  });

  const comments = knex.schema.createTable('comments', function(t) {
    t.increments('id').primary();
    t.string('comment').notNullable();
    t.integer('user_id').notNullable().references('users.id');
    t.string('commentable_type').notNullable();
    t.integer('commentable_id').notNullable();
    t.timestamps(true, true);
  });

  return Promise.all([
    optionTypes,
    optionValues,
    teams,
    characters,
    customers,
    events,
    eventSlot,
    memberships,
    contact_types,
    contacts,
    users,
    comments
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('optionTypes'),
    knex.schema.dropTable('teams'),
    knex.schema.dropTable('characters'),
    knex.schema.dropTable('customers'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('eventSlot'),
    knex.schema.dropTable('memberships'),
    knex.schema.dropTable('contacts'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('comments')
  ]);
};