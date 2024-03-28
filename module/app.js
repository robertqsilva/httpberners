const http = require("http");
const Router = require("./router");
const Request = require("./request");
const Response = require("./response");
const aceptJson = require('./jsonAcept')
const url = require("url");


function createApplication() {
  const server = http.createServer(handleRequest);
  const router = new Router();
  const middlewares = [];

  function handleRequest(req, res) {
    const request = new Request(req);
    const response = new Response(res);

    let index = 0;
    const advance = () => {
      if (index < middlewares.length) {
        const middleware = middlewares[index++];
        middleware(request, response, advance);
      } else {
        router.handle(request, response);
      }
    };


    advance();
  }

  function listen(port, callback) {
    server.listen(port, callback);
  }

  function endpoint(method, path, handler) {
    
    router.route(path, method, handler);
  }

  function use(middleware) {
    middlewares.push(middleware);
  }

  

  return {
    listen,
    endpoint,
    use,
    aceptJson,
  };
}

module.exports = createApplication;

