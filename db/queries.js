const knex = require('./knex');

module.exports= {
  getAll(table) {
    return knex(table);
  },
  getOne(table, id) {
    return knex(table).where("id", id).first();
  },
  create(table, newItem) {
    return knex(table).insert(newItem).returning("*");
  },
  getUserByEmail(user_email) {
    return knex("user").where("email", user_email).first();
  },
  changeTaps(beers) {
    return knex("on-tap").update(beers);
  },
  getTaps() {
    return knex("on-tap").join("beer", function() {
      console.log(this);
      this.on("beer.id", "on-tap.left_tap").andOn("beer.id", "on-tap.right_tap").andOn("beer.id", "on-tap.cooler");
    });
  }
};
