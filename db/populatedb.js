const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100),
        category VARCHAR(30),
        price DECIMAL,
        brand VARCHAR(40),
        quantity INTEGER,
        image BYTEA,
        image_type VARCHAR(100),
        details JSONB
    );

    CREATE TABLE IF NOT EXISTS builds (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      built_for VARCHAR(100),
      build_name VARCHAR(100),
      price DECIMAL,
      image BYTEA,
      image_type VARCHAR(100),
      parts JSONB
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(100)
    );
`;

async function main() {
  console.log("Seeding...");

  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: { rejectUnauthorized: true, ca: process.env.DB_CA },
  });

  await client.connect();

  await client.query(SQL);

  await client.end();

  console.log("Done!");
}

main();
