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

const readImageAndSend = (filePath, response) => {
  fs.readFile(filePath, (error, data) => {
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

const handlePageNotFound = (request, response) => {
  const statusCode = 404;
  response.setStatusCode(statusCode);
  response.send();
};

const handleHome = (request, response) => {
  readFileAndSend("./html/index.html", response);
};

const handleAbeliophyllum = (request, response) => {
  readFileAndSend("./html/abeliophyllum.html", response);
};

const handleAgeratum = (request, response) => {
  readFileAndSend("./html/ageratum.html", response);
};

const handleGroupOfFlowersImage = (request, response) => {
  readImageAndSend("./images/freshorigins.jpg", response);
};

const handle = (request, response) => {
  const routes = [
    { route: "/", handler: handleHome },
    {
      route: "/abeliophyllum",
      handler: handleAbeliophyllum,
    },
    {
      route: "/ageratum",
      handler: handleAgeratum,
    },
    { route: "/home-page-image", handler: handleGroupOfFlowersImage },
    { route: ".*", handler: handlePageNotFound },
  ];

  const { handler } = routes.find(({ route }) => {
    const pattern = new RegExp(`^${route}$`);
    return pattern.test(request.uri);
  });

  handler(request, response);
};

module.exports = { handle };
