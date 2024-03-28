const http = require("http");
const Router = require("./router");
const Request = require("./request");
const Response = require("./response");
const jsonMiddleware = require("./jsonAcept");
const url = require("url");

class createApplication {
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
    this.router = new Router();
    this.middlewares = [];
  }

  handleRequest(req, res) {
    const request = new Request(req);
    const response = new Response(res);

    let index = 0;
    const advance = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(req, response, advance);
      } else {
        this.router.handle(req, response);
      }
    };

    advance();
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  endpoint(method, path, handler) {
    this.router.route(path, method, handler);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  static json() {
    return jsonMiddleware;
  }
}

module.exports = createApplication;
