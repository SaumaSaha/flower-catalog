const fs = require("fs");

const getContentType = (filePath) => {
  const CONTENT_TYPES = [
    { fileType: ".html", contentType: "text/html" },
    { fileType: ".jpg", contentType: "image/jpeg" },
    { fileType: ".css", contentType: "text/css" },
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

const isValidUri = (uri) => {
  const exists = fs.existsSync(`./resources${uri}`);
  console.log(`./resources${uri}`, exists);

  return exists;
};

const handlePageNotFound = (request, response) => {
  const statusCode = 404;
  response.setStatusCode(statusCode);
  response.send();
};

const handleHome = (request, response) => {
  readFileAndSend("./resources/pages/index.html", response);
};

const handleValidRequest = (request, response) => {
  const filePath = `./resources/${request.uri}`;
  readFileAndSend(filePath, response);
};

const handle = (request, response) => {
  if (request.uri === "/") {
    handleHome(request, response);
    return;
  }
  if (isValidUri(request.uri)) {
    handleValidRequest(request, response);
    return;
  }

  handlePageNotFound(request, response);
};

module.exports = { handle };
