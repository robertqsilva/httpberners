# httpberners

<div style="font-size: 14px;">Este é o httpberners um framework simples para criação de servidores HTTP em Node.js. Ele permite criar rotas, lidar com middlewares e iniciar o servidor de forma fácil e flexível.</div><br>

```javascript
const httpberners = require("httpberners");
const app = httpberners();

app.use(httpberners.json())

app.endpoint("GET", "/", function (req, res) {
  res.send("Bem-vindo ao servidor!");
});

app.endpoint("POST", "/", (req, res) => {
  res.code(201).json(req.body);
 
});

app.listen(3000);
```

## Instalação

<div style="font-size: 14px;">Para instalar o httpberners, basta utilizar o:</div><br>

```
git clone git@github.com:robertqsilva/httpberners.git
cd httpberners
npm install
```


## Criar uma aplicação
```javascript
const httpberners = require("httpberners");

const app = httpberners();
```
## Defir rota 
<div style="font-size: 14px;">Você pode definir rotas usando o método `endpoint`. Aqui está um exemplo de como definir uma rota para lidar com requisições GET:</div><br>

```javascript
app.endpoint("GET", "/rota", (req, res) => {
  res.send("Hello Dev");
});
```

<div style="font-size: 14px;">Para lidar com requisições POST, você pode usar o mesmo método endpoint, mas passando "POST" como o primeiro argumento:</div><br>

```javascript
app.endpoint("POST", "/rota", (req, res) => {
  res.json({ mensagem: "Hello dev!"});
});
```

## Definir middlewares
<div style="font-size: 14px;">Você pode usar middlewares para executar código em todas as requisições antes de chegar às rotas. Basta usar o método `use` e passar a função middleware como argumento:</div><br>

```javascript
app.use((req, res, advance) => {
   console.log('Middleware executado');
  advance()
 });
```

## Lidar com parâmetros de rota e query string

```javascript 
app.endpoint("GET", "/user/:id", (req, res) => {
    const { id } = req.params
  res.send(`Detalhes do usuário com ID ${ id }`);
});

app.endpoint("GET", "/search",  (req, res) => {
    const { auth } = req.query
  res.send(`Resultado da busca: ${ auth }`);
});
```
<div style="font-size: 14px;">isso permite criar rotas dinâmicas e acessar os parâmetros e query strings na requisição.</div>




