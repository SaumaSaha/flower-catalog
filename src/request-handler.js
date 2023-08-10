const fs = require("fs");

const STATUS_CODES = {
  ok: 200,
  notFound: 404,
};

const MIME_TYPES = {
  html: "text/html",
  jpg: "images/jpeg",
  css: "text/css",
  pdf: "application/pdf",
  gif: "images/gif",
  js: "text/javascript",
};

const getHeaders = (filePath) => {
  const HEADERS = {
    html: { "Content-Type": MIME_TYPES.html },
    jpg: { "Content-Type": MIME_TYPES.jpg },
    css: { "Content-Type": MIME_TYPES.css },
    gif: { "Content-Type": MIME_TYPES.gif },
    js: { "Content-Type": MIME_TYPES.js },
    pdf: {
      "Content-Type": MIME_TYPES.pdf,
      "Content-Disposition": "attachment",
    },
  };

  const extension = filePath.split(".").at(-1);

  return HEADERS[extension];
};

const isValidUrl = (url) => !url.includes("..");

const generateFilePath = (url) => {
  return url === "/" ? "./resources/pages/index.html" : `./resources${url}`;
};

const handlePageNotFound = (request, response) => {
  const content = `${request.url} Not Found`;
  response.writeHead(200, {
    "Content-length": content.length,
    "Content-Type": "text/plain",
  });
  response.end(content);
};

const handleValidRequest = (request, response) => {
  const filePath = generateFilePath(request.url);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      handlePageNotFound(request, response);
      return;
    }

    const headers = getHeaders(filePath);

    response.writeHead(STATUS_CODES.ok, {
      ...headers,
      "Content-length": content.length,
    });

    response.end(content);
  });
};

const handle = (request, response) => {
  if (isValidUrl(request.url)) {
    handleValidRequest(request, response);
    return;
  }

  handlePageNotFound(request, response);
};

module.exports = { handle };
