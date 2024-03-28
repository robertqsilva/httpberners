function jsonMiddleware(req, res, advace) {
  if (req.headers["content-type"] === "application/json") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        req.body = JSON.parse(data);
        advace();
      } catch (error) {
        res.code(400);
        res.header("Content-Type", "application/json");
        res.send(JSON.stringify({ error: "Erro ao analisar JSON" }));
      }
    });
  } else {
    advace();
  }
}

module.exports = jsonMiddleware;
