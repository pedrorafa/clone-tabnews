import migrationRunner from "infra/migrationRunner.js";

export default async function migrations(request, response) {
  switch (request.method) {
    case "POST":
      response.status(200).json(
        await migrationRunner.executeMigrations({
          dryRun: false,
          testing: request.body.testing,
        }),
      );
      break;
    case "GET":
      response.status(200).json(await migrationRunner.executeMigrations(true));
      break;
    default:
      response.status(405).end();
      break;
  }
}
