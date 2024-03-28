const myFramework = require("./module/app");

const app = myFramework();

// app.use((req, res, advance) => {
//   console.log('passei no midleware');
//   advance()
// });



// Rota principal
app.endpoint("GET", "/", function (req, res) {
  res.send("Bem-vindo ao servidor!");
  
});

// Rota para lidar com o corpo da requisição
app.endpoint("POST", "/echo", async function (req, res) {
  res.send("ok")


});

// Rota com parâmetro de rota
app.endpoint("GET", "/user/:id/", function (req, res) {
  res.send(`Detalhes do usuário com ID ${req.params.id}`);
});

// Rota com query string
app.endpoint("GET", "/search", function (req, res) {
  res.send(`Resultado da busca: ${req.query.q}`);
});

// Iniciar o servidor
app.listen(3000, function () {
  console.log("Servidor está rodando na porta 3000");
});
