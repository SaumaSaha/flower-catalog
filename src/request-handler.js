const fs = require("fs");

const STATUS_CODES = {
  ok: 200,
  notFound: 404,
};

const getContentType = (filePath) => {
  const CONTENT_TYPES = {
    html: { contentType: "text/html", contentDisposition: "inline" },
    jpg: { contentType: "image/jpeg", contentDisposition: "inline" },
    css: { contentType: "text/css", contentDisposition: "inline" },
    pdf: { contentType: "application/pdf", contentDisposition: "attachment" },
  };

  const extension = filePath.split(".").at(-1);

  return CONTENT_TYPES[extension];
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

const readFileAndSend = (request, response) => {
  const filePath = generateFilePath(request.uri);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      handlePageNotFound(request, response);
      return;
    }

    const { contentType, contentDisposition } = getContentType(filePath);

    response.setStatusCode(STATUS_CODES.ok);
    response.setContent(content);
    response.addHeader("Content-Type", contentType);
    response.addHeader("Content-Disposition", contentDisposition);
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
