const fs = require("fs");

const STATUS_CODES = {
  ok: 200,
  notFound: 404,
};

const getHeaders = (filePath) => {
  const HEADERS = {
    html: { "Content-Type": "text/html" },
    jpg: { "Content-Type": "image/jpeg" },
    css: { "Content-Type": "text/css" },
    pdf: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment",
    },
  };

  const extension = filePath.split(".").at(-1);

  return HEADERS[extension];
};

const isValidUri = (uri) => !uri.includes("..");

const handlePageNotFound = (request, response) => {
  response.setStatusCode(STATUS_CODES.notFound);
  response.setContent(`${request.uri} Not Found`);
  response.addHeader("Content-Type", "text/plain");
  response.addHeader("Content-Disposition", "inline");
  response.send();
};

const generateFilePath = (uri) => {
  return uri === "/" ? "./resources/pages/index.html" : `./resources${uri}`;
};

const addHeaders = (headers, response) => {
  for (const key in headers) {
    response.addHeader(key, headers[key]);
  }
};

const sendSuccessResponse = (content, headers, response) => {
  response.setStatusCode(STATUS_CODES.ok);
  response.setContent(content);
  addHeaders(headers, response);
  response.send();
};

const readFileAndSend = (request, response) => {
  const filePath = generateFilePath(request.uri);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      handlePageNotFound(request, response);
      return;
    }

    const headers = getHeaders(filePath);

    sendSuccessResponse(content, headers, response);
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
