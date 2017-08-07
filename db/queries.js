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
  changeTaps(beer, tap) {
    console.log("tap", tap);

    return knex("on-tap").where("tap", tap).update("beer_id", beer);
  },
  getTaps() {
    return knex("on-tap").innerJoin("beer", "on-tap.beer_id", "beer.id");
  },
  getOnTap(){
    return knex.select("beer_id").from("on-tap");
  },
  deleteOne(table, id) {
    return knex(table).where("id", id).del();
  }
};
