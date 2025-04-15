import retry from "async-retry";
import database from "infra/database";

function getWebServerQuery(query) {
  if (query[0] === "/" || query[0] === "\\") query = query.substr(1);
  return `http://localhost:3000/${query}`;
}

async function waitForAllServices() {
  await waitForWebServices();

  async function waitForWebServices() {
    return await retry(fetchWebServerStatus, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchWebServerStatus(bail, triesCount) {
      if (triesCount === 25)
        console.log(
          `We already made ${triesCount} request's on server! Be sure that server builder is running.`,
        );

      const response = await fetch(getWebServerQuery("api/v1/status"));
      if (response.ok) return await response.json();
      throw new Error(
        `Error on request "/status" status code: ${response.status}`,
      );
    }
  }
}

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

const orchestrator = {
  waitForAllServices,
  getWebServerQuery,
  cleanDatabase,
};

export default orchestrator;
