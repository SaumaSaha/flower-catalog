const fs = require("fs");

const read = (filePath, cb) => {
  fs.readFile(filePath, { encoding: "utf-8" }, (error, data) => {
    if (error) {
      console.error(error);
      return;
    }

    cb(data);
  });
};

const handleFavicon = (request, response) => {
  response.setStatusCode(404);
  response.send();
};

const handleHome = (request, response) => {
  read("./html/index.html", (data) => {
    const statusCode = 200;
    response.setStatusCode(statusCode);
    response.setContent(data);
    response.send();
  });
};

const handleAboutAbeliophyllum = (request, response) => {
  read("./html/abeliophyllum.html", (data) => {
    const statusCode = 200;
    response.setStatusCode(statusCode);
    response.setContent(data);
    response.send();
  });
};

const handleAboutAgeratum = (request, response) => {
  read("./html/ageratum.html", (data) => {
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
    { route: "/favicon.ico", handler: handleFavicon },
  ];

  const { handler } = routes.find(({ route }) => route === request.uri);

  handler(request, response);
};

module.exports = { handle };
