const fs = require('fs')

class Response {
  constructor(res) {
    this.res = res;
  }

  static json(data){
      this.res.setHeader("Content-Type", "application/json");
      const jsonData = JSON.stringify(data);
      this.res.end(jsonData);
      return this
  }

  send(data) {
    this.res.end(data);
    return this;
  }

  sendFile(path){
    fs.readFile(path, (err, data) => {
      if(err){
        this.res.statusCode = 500
        this.res.end("Erro ao ler o arquivo HTML"); 
      }

      this.res.setHeader("Content-Type", "text/html");
       this.res.end(data);
    })
    return this;
  }

  code(statusCode){
    this.res.statusCode = statusCode;
    return this;
  }
  header(header, value){
    this.res.setHeader(header, value);
    return this;
  }

  json(data){
    this.res.setHeader("Content-Type", "application/json");
    const jsonData = JSON.stringify(data);
    this.res.end(jsonData);
    return this;
  }
}

module.exports = Response;
