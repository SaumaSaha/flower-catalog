const fs = require("fs");

const getContentType = (filePath) => {
  const CONTENT_TYPES = [
    { fileType: ".html", contentType: "text/html" },
    { fileType: ".jpg", contentType: "image/jpeg" },
  ];

  const { contentType } = CONTENT_TYPES.find(({ fileType }) => {
    return filePath.endsWith(fileType);
  });

  return contentType;
};

const readFileAndSend = (filePath, response) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      console.error(error);
      return;
    }

    const statusCode = 200;
    const contentType = getContentType(filePath);

    response.setStatusCode(statusCode);
    response.setContent(data, contentType);
    response.send();
  });
};

const handlePageNotFound = (request, response) => {
  const statusCode = 404;
  response.setStatusCode(statusCode);
  response.send();
};

const handleHome = (request, response) => {
  readFileAndSend("./resources/html/index.html", response);
};

const handleAbeliophyllum = (request, response) => {
  readFileAndSend("./resources/html/abeliophyllum.html", response);
};

const handleAgeratum = (request, response) => {
  readFileAndSend("./resources/html/ageratum.html", response);
};

const handleHomePageImage = (request, response) => {
  readFileAndSend("./resources/images/home-page-image.jpg", response);
};

const handleAbeliophyllumImage = (request, response) => {
  readFileAndSend("./resources/images/abeliophyllum-image.jpg", response);
};

const handleAgeratumImage = (request, response) => {
  readFileAndSend("./resources/images/ageratum-image.jpg", response);
};

const handle = (request, response) => {
  console.log(request);
  const routes = [
    { route: "/", handler: handleHome },
    {
      route: "/abeliophyllum.html",
      handler: handleAbeliophyllum,
    },
    {
      route: "/ageratum.html",
      handler: handleAgeratum,
    },
    { route: "/home-page-image.jpg", handler: handleHomePageImage },
    { route: "/abeliophyllum-image.jpg", handler: handleAbeliophyllumImage },
    { route: "/ageratum-image.jpg", handler: handleAgeratumImage },
    { route: ".*", handler: handlePageNotFound },
  ];

  const { handler } = routes.find(({ route }) => {
    const pattern = new RegExp(`^${route}$`);
    return pattern.test(request.uri);
  });

  handler(request, response);
};

module.exports = { handle };
