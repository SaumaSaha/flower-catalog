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
    { route: "/", handler: handleHome },
    { route: "/index.html", handler: handleHome },
    {
      route: "/abeliophyllum.html",
      handler: handleAboutAbeliophyllum,
    },
    {
      route: "/ageratum.html",
      handler: handleAboutAgeratum,
    },
  ];

  const { handler } = routes.find(({ route }) => route === request.uri);

  handler(request, response);
};

module.exports = { handle };
