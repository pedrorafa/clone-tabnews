import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const migratedMigrations = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );
  expect(migratedMigrations.status).toBe(201);

  var migratedMigrationsBody = await migratedMigrations.json();

  expect(Array.isArray(migratedMigrationsBody)).toBe(true);
  expect(migratedMigrationsBody.length).toBeGreaterThan(0);

  const pendingMigrations = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );
  expect(pendingMigrations.status).toBe(200);

  var pendingMigrationsBody = await pendingMigrations.json();

  expect(Array.isArray(pendingMigrationsBody)).toBe(true);
  expect(pendingMigrationsBody.length).toBe(0);
});
