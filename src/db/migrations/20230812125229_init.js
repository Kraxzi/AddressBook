/* eslint-disable @typescript-eslint/explicit-function-return-type */
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("users");
};
