function status(request, response) {
  response.send(200).json({ teste: "valor" });
}

export default status;
