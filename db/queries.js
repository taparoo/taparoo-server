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
    return knex("beer").where("id", beer).update("tap", tap);
  },
  resetTaps(){
    return knex("beer").whereNot("tap", "=", "off").update("tap", "off");
  },
  // getTaps() {
  //   return knex("on-tap").innerJoin("beer", "on-tap.beer_id", "beer.id");
  // },
  getTaps() {
    return knex("beer").whereNot("tap", "=", "off");
  },
  getOnTap(){
    return knex.select("beer_id").from("on-tap");
  },
  deleteOne(table, id) {
    return knex(table).where("id", id).del();
  }
};
