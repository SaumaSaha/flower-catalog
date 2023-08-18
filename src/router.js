class Router {
  #handlers;
  constructor() {
    this.#handlers = [];
  }

  addHandler(method, route, handler) {
    this.#handlers.push({ method, route, handler });
  }

  route(request, response) {
    const { handler } = this.#handlers.find(({ method, route }) => {
      const routeRegex = new RegExp(route);

      return method === "ANY"
        ? routeRegex.test(request.url)
        : routeRegex.test(request.url) && method === request.method;
    });

    handler(request, response);
  }
}

module.exports = { Router };
