/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      extension: ".ts",
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
  },
};
