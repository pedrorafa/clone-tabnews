import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.Query("SELECT 1 + 1 as sum");
  console.log(result.rows);
  response.status(200).json({ teste: "valor" });
}

export default status;
