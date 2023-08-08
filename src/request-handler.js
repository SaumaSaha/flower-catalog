const fs = require("fs");

const handleHome = (request, response) => {
  fs.readFile("./html/index.html", { encoding: "utf-8" }, (error, data) => {
    const statusCode = 200;
    response.setStatusCode(statusCode);
    response.setContent(data);
    response.send();
  });
};

const handleAboutAbeliophyllum = (request, response) => {
  fs.readFile(
    "./html/abeliophyllum.html",
    { encoding: "utf-8" },
    (error, data) => {
      const statusCode = 200;
      response.setStatusCode(statusCode);
      response.setContent(data);
      response.send();
    }
  );
};

const handleAboutAgeratum = (request, response) => {
  fs.readFile("./html/ageratum.html", { encoding: "utf-8" }, (error, data) => {
    const statusCode = 200;
    response.setStatusCode(statusCode);
    response.setContent(data);
    response.send();
  });
};

const handle = (request, response) => {
  const routes = [
    { route: new RegExp("^/$"), handler: handleHome },
    { route: new RegExp("^/index.html$"), handler: handleHome },
    {
      route: new RegExp("^/abeliophyllum.html$"),
      handler: handleAboutAbeliophyllum,
    },
    {
      route: new RegExp("^/ageratum.html$"),
      handler: handleAboutAgeratum,
    },
  ];

  const { handler } = routes.find(({ route }) => route.test(request.uri));

  handler(request, response);
};

module.exports = { handle };
