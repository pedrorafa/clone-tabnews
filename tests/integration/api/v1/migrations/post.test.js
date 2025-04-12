import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
});

test("POST to /api/v1/migrations should return 200", async () => {
  const migratedMigrations = await fetch(
    orchestrator.getWebServerQuery("/api/v1/migrations"),
    {
      method: "POST",
    },
  );
  expect(migratedMigrations.status).toBe(201);

  var migratedMigrationsBody = await migratedMigrations.json();

  expect(Array.isArray(migratedMigrationsBody)).toBe(true);
  expect(migratedMigrationsBody.length).toBeGreaterThan(0);

  const pendingMigrations = await fetch(
    orchestrator.getWebServerQuery("/api/v1/migrations"),
    {
      method: "POST",
    },
  );
  expect(pendingMigrations.status).toBe(200);

  var pendingMigrationsBody = await pendingMigrations.json();

  expect(Array.isArray(pendingMigrationsBody)).toBe(true);
  expect(pendingMigrationsBody.length).toBe(0);
});
