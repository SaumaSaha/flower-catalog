const fs = require("fs");

const STATUS_CODES = {
  ok: 200,
  notFound: 404,
};

const MIME_TYPES = {
  html: "text/html",
  plain: "text/plain",
  jpg: "images/jpeg",
  css: "text/css",
  pdf: "application/pdf",
  gif: "images/gif",
  js: "text/javascript",
};

const CONTENT_DISPOSITION = {
  attachment: "attachment",
};

const getHeaders = (filePath) => {
  const headers = {
    html: { "Content-Type": MIME_TYPES.html },
    jpg: { "Content-Type": MIME_TYPES.jpg },
    css: { "Content-Type": MIME_TYPES.css },
    gif: { "Content-Type": MIME_TYPES.gif },
    js: { "Content-Type": MIME_TYPES.js },
    pdf: {
      "Content-Type": MIME_TYPES.pdf,
      "Content-Disposition": CONTENT_DISPOSITION.attachment,
    },
  };

  const extension = filePath.split(".").pop();

  return headers[extension];
};

const isValidUrl = (url) => !url.includes("..");

const generateFilePath = (url) => {
  return url === "/" ? "./resources/pages/index.html" : `./resources${url}`;
};

const sendHeaders = (headers, response) => {
  Object.entries(headers).forEach(([headerName, headerValue]) => {
    response.setHeader(headerName, headerValue);
  });
};

const handlePageNotFound = (request, response) => {
  const content = `${request.url} Not Found`;

  response.statusCode = STATUS_CODES.notFound;
  sendHeaders({ "Content-Type": MIME_TYPES.plain });
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

    response.statusCode = STATUS_CODES.ok;
    sendHeaders(headers, response);
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
