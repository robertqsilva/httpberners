function jsonMiddleware(req, res, advance) {
  try {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      req.body = JSON.parse(data);
      advance();
    });
  } catch (error) {
    res.code(400)
    res.send("Erro ao processar JSON no corpo da requisição");
  }
}

module.exports = jsonMiddleware;
