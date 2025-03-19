import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const dbVersionQuery = await database.Query("Show server_version;");
  const dbVersion = dbVersionQuery.rows[0].server_version;

  const dbMaxConnectionsQuery = await database.Query("Show max_connections");
  const dbMaxConnections = dbMaxConnectionsQuery.rows[0].max_connections;

  const dbOpenedConnetionsQuery = await database.Query(
    "Select * from pg_stat_activity",
  );
  const dbOpenedConnetions = dbOpenedConnetionsQuery.rows.filter(
    (conn) =>
      conn.usename === process.env.POSTGRES_USER && conn.state === "active",
  ).length;

  const updatedAt = new Date().toISOString();

  const body = {
    updatedAt: updatedAt,
    dependencies: {
      database: {
        version: Number(dbVersion),
        max_connections: Number(dbMaxConnections),
        opened_connections: Number(dbOpenedConnetions),
      },
    },
  };

  response.status(200).json(body);
}

export default status;
