import retry from "async-retry";
import database from "infra/database";

function getWebServerQuery(query) {
  return `http://localhost:3000${query}`;
}

async function waitForAllServices() {
  await waitForWebServices();

  async function waitForWebServices() {
    return await retry(fetchWebServerStatus, {
      retries: 100,
      minTimeout: 100,
      maxTimeout: 1000,
    });

    async function fetchWebServerStatus() {
      const response = await fetch(getWebServerQuery("/api/v1/status"));
      await response.json();
    }
  }
}

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

export default {
  waitForAllServices,
  getWebServerQuery,
  cleanDatabase,
};
