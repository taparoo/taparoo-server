const knex = require('./knex');

module.exports= {
  getAll(table) {
    return knex(table);
  },
  create(table, newItem) {
  return knex(table).insert(newItem).returning("*");
  },
  getUserByEmail(user_email) {
    return knex("user").where("email", user_email).first();
  }
};
