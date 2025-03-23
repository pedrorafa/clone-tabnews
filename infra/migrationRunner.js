import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function executeMigrations(dryRun = false) {
  const dbClient = database.getClient();

  let migrations;
  try {
    dbClient.connect();

    migrations = await migrationRunner({
      dbClient: dbClient,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      dryRun: dryRun,
    });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    dbClient.end();
  }
  return migrations;
}

export default {
  executeMigrations: executeMigrations,
};
