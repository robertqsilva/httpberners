// Exemplo de middleware
function loggerMiddleware(req, res, advance) {
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  advance();
}

async function jsonMiddleware(req, res, advance) {
  try {
    let data = "";
    const processData = new Promise((resolve, reject) => {
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        try {
          const parsedBody = JSON.parse(data);
          resolve(parsedBody);
        } catch (error) {
          reject(error);
        }
      });
    });

    const requestBody = await processData;
    req.body = requestBody;
    advance();
  } catch (error) {
    res.code(400);
    res.header("Content-Type", "text/plain");
    res.send("Erro ao processar JSON no corpo da requisição");
  }
}


module.exports = {
  loggerMiddleware,
  jsonMiddleware,
};
