const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE products (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100),
        category VARCHAR(30),
        price DECIMAL,
        brand VARCHAR(40),
        quantity INTEGER,
        image BYTEA,
        details JSONB
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
