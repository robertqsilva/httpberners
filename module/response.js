class Response {
  constructor(res) {
    this.res = res;
  }

  send(data) {
    this.res.end(data);
  }

  code(statusCode){
    this.res.statusCode = statusCode;
  }
  header(header, value){
    this.res.setHeader(header, value);
  }
}

module.exports = Response;
