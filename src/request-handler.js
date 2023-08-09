const fs = require("fs");

const STATUS_CODES = {
  ok: 200,
  notFound: 404,
};

const getContentType = (filePath) => {
  const CONTENT_TYPES = {
    html: "text/html",
    jpg: "image/jpeg",
    css: "text/css",
  };

  const extension = filePath.split(".").at(-1);

  return CONTENT_TYPES[extension];
};

const isValidUri = (uri) => !uri.includes("..");

const handlePageNotFound = (request, response) => {
  response.setStatusCode(STATUS_CODES.notFound);
  response.send();
};

const generateFilePath = (uri) => {
  return uri === "/" ? "./resources/pages/index.html" : `./resources${uri}`;
};

const readFileAndSend = (request, response) => {
  const filePath = generateFilePath(request.uri);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      handlePageNotFound(request, response);
      return;
    }

    const contentType = getContentType(filePath);

    response.setStatusCode(STATUS_CODES.ok);
    response.setContent(data, contentType);
    response.send();
  });
};

const handle = (request, response) => {
  if (isValidUri(request.uri)) {
    readFileAndSend(request, response);
    return;
  }

  handlePageNotFound(request, response);
};

module.exports = { handle };
