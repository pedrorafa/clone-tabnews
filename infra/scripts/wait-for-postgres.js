const { exec } = require("node:child_process");

function waitForPostgres() {
  exec("docker exec postgres-db pg_isready --host localhost", handlePgIsReady);

  function handlePgIsReady(error, stdout) {
    if (stdout.includes("accepting connections")) {
      console.log("\n\n* Postgres is ready\n");
      return;
    }
    process.stdout.write(".");
    waitForPostgres();
  }
}

console.log("\n> Waiting for postgres");
waitForPostgres();
