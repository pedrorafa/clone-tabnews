import database from "infra/database.js";

export default async function status(request, response) {
  const dbVersionQuery = await database.query("Show server_version;");
  const dbVersion = dbVersionQuery.rows[0].server_version;

  const dbMaxConnectionsQuery = await database.query("Show max_connections");
  const dbMaxConnections = Number(
    dbMaxConnectionsQuery.rows[0].max_connections,
  );

  const dbOpenedConnetionsQuery = await database.query({
    text: "Select count(*)::int from pg_stat_activity WHERE state = $1 AND usename = $2 AND datname = $3;",
    values: ["active", process.env.POSTGRES_USER, process.env.POSTGRES_DB],
  });
  const dbOpenedConnetions = dbOpenedConnetionsQuery.rows[0].count;

  const updatedAt = new Date().toISOString();

  const body = {
    updatedAt: updatedAt,
    dependencies: {
      database: {
        version: dbVersion,
        max_connections: dbMaxConnections,
        opened_connections: dbOpenedConnetions,
      },
    },
  };

  response.status(200).json(body);
}
