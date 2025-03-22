import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function executeMigrations(dryRun = false, testing = false) {
  const dbClient = database.getClient();

  let migrations;
  try {
    dbClient.connect();
    await dbClient.query("BEGIN");

    migrations = await migrationRunner({
      dbClient: dbClient,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      dryRun: dryRun,
      verbose: true,
    });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    const commitQuery = testing ? "ROLLBACK" : "COMMIT";
    await dbClient.query(commitQuery);
    dbClient.end();
  }
  return migrations;
}

export default {
  executeMigrations: executeMigrations,
};
