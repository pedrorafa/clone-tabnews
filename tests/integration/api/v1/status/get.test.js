test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const body = await response.json();

  expect(body.updatedAt).toBeDefined();

  const database = body.dependencies.database;

  expect(database.version).toEqual("16.0");
  expect(database.max_connections).toBe(100);
  expect(database.opened_connections).toBe(1);
});
