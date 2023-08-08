const fs = require("fs");

const readFileAndSend = (filePath, response) => {
  fs.readFile(filePath, { encoding: "utf-8" }, (error, data) => {
    if (error) {
      console.error(error);
      return;
    }

    const statusCode = 200;
    response.setStatusCode(statusCode);
    response.setContent(data);
    response.send();
  });
};

const handleFavicon = (request, response) => {
  const statusCode = 404;
  response.setStatusCode(statusCode);
  response.send();
};

const handleHome = (request, response) => {
  readFileAndSend("./html/index.html", response);
};

const handleAboutAbeliophyllum = (request, response) => {
  readFileAndSend("./html/abeliophyllum.html", response);
};

const handleAboutAgeratum = (request, response) => {
  readFileAndSend("./html/ageratum.html", response);
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
