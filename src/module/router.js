class Router {
  constructor() {
    this.routes = {};
  }

  route(url, method, handler) {
    if (!this.routes[url]) {
      this.routes[url] = {};
    }
    this.routes[url][method] = handler;
  }

  handle(request, response) {
    const { method, url } = request;
    const urlParts = url.split("?")[0].split("/").slice(1);

    for (const routeUrl in this.routes) {
      const routeParts = routeUrl.split("/").slice(1);

      if (routeParts.length !== urlParts.length) continue;

      let params = {};

      const matched = routeParts.every((part, index) => {
        if (part.startsWith(":")) {
          const paramName = part.slice(1);
          params[paramName] = urlParts[index];
          return true;
        } else {
          return part === urlParts[index];
        }
      });

      

      if (matched && this.routes[routeUrl][method]) {
        
        request.params = params;
        this.routes[routeUrl][method](request, response);
        return;
      }
    }

    response.sendFile('./src/pages/error.html')
  }
}

module.exports = Router;
