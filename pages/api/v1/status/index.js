import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const dbVersionQuery = await database.Query("Show server_version;");
  const dbVersion = dbVersionQuery.rows[0].server_version;

  const dbMaxConnectionsQuery = await database.Query("Show max_connections");
  const dbMaxConnections = Number(
    dbMaxConnectionsQuery.rows[0].max_connections,
  );

  const dbOpenedConnetionsQuery = await database.Query({
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

export default status;
