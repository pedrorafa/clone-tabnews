import migrator from "infra/migrator.js";

export default async function migrations(request, response) {
  switch (request.method) {
    case "POST": {
      const migrations = await migrator.executeMigrations(false);
      const status = migrations.length > 0 ? 201 : 200;

      response.status(status).json(migrations);
      break;
    }
    case "GET": {
      response.status(200).json(await migrator.executeMigrations(true));
      break;
    }
    default: {
      response.status(405).end();
      break;
    }
  }
}
