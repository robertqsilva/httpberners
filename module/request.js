const url = require("url");

let realBody;

class Request {
  constructor(req) {
    this.method = req.method;
    this.url = req.url;
    this.headers = req.headers;

    const parsedUrl = url.parse(req.url, true);
    this.query = parsedUrl.query;

    this.info = {
      url: this.url,
      timestamp: new Date().toISOString(),
    };
  }

}



module.exports = Request;
