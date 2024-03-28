const httpberners = require("httpberners");
const app = new httpberners();

app.use(httpberners.json())

app.use((req, res, advance) => {
  console.log("Middleware executado");
  advance();
});

app.endpoint("POST", "/", (req, res) => {
  res.code(201).json(req.body);
});

app.listen(3000, function () {
  console.log("Servidor está rodando na porta 3000");
});
