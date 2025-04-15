import { Client } from "pg";

function getSsl() {
  if (process.env.POSTGRES_CA)
    return {
      ca: process.env.POSTGRES_CA,
    };
  return process.env.NODE_ENV === "production";
}

function getClient() {
  return new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSsl(),
  });
}

async function query(queryObject) {
  const client = getClient();

  let result = undefined;

  try {
    await client.connect();
    result = await client.query(queryObject);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }

  return result;
}

const database = {
  getClient: getClient,
  query: query,
};

export default database;
