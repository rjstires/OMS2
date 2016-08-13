const dbConfig = require('../db/knexfile');
const knex = require('knex')(dbConfig);
const boostingBookshelf = require('bookshelf')(knex);
const _ = require('lodash');
const Checkit = require('checkit');

let proto;

// Virtual plugin allows definition of virtual properties, not saved to the database.
boostingBookshelf.plugin('virtuals');

// Registry prevents circular dependancies when defining models.
boostingBookshelf.plugin('registry');

// Cache an instance of the model prototype.
proto = boostingBookshelf.Model.prototype;

boostingBookshelf.Model = boostingBookshelf.Model.extend({

  hasTimestamps: true,

  initialize: function(){
    this.on('saving', this.validateSave);
  },

  validateSave(){
    const rules = this.validationRules || {};
    return new Checkit(rules).run(this.attributes);
  }

}, {
  findOne: function findOne(data, options) {
    return this.forge(data).fetch(options);
  },

  findById: function(id, data, options) {
    data = _.assign({}, data, {id: id});
    return this.forge(data).fetch(options);
  },

  findAll: function(data, options) {
    return this.forge(data).fetchAll(options);
  },

  updateById: function(id, data) {
    return this.forge({id: id}).save(data);
  },

  destroyById: function(id) {
    return this.forge({id: id}).destroy();
  }
});

module.exports = boostingBookshelf;