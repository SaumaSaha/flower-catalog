const fs = require("fs");
const { createCommentsElement } = require("./html-generator");

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

const isGuestBookRequest = (url) => url === "/pages/guest-book.html";

const isRequestForComment = (url) => url.includes("/comment?");

const generateFilePath = (url) => {
  return url === "/" ? "./resources/pages/index.html" : `./resources${url}`;
};

const getQueryParams = (url) => {
  const queryString = url.split("?").pop();

  return new URLSearchParams(queryString);
};

const sendHeaders = (headers, response) => {
  Object.entries(headers).forEach(([headerName, headerValue]) => {
    response.setHeader(headerName, headerValue);
  });
};

const sendRedirectToGuestBook = (request, response) => {
  response.writeHead(302, { location: "/pages/guest-book.html" });
  response.end();
};

const handleComment = (request, response, commentsHandler) => {
  const queryParams = getQueryParams(request.url);
  const comment = Object.fromEntries(queryParams.entries());
  comment.date = new Date().toLocaleString();

  commentsHandler.addComment(comment);
  sendRedirectToGuestBook(request, response);
};

const servePageNotFound = (request, response) => {
  const content = `${request.url} Not Found`;

  response.statusCode = STATUS_CODES.notFound;
  sendHeaders({ "Content-Type": MIME_TYPES.plain }, response);
  response.end(content);
};

const serveGuestBook = (request, response, commentsHandler) => {
  const element = "<article id='comments'></article>";

  const comments = commentsHandler.getComments();
  const commentsElement = createCommentsElement(comments);

  fs.readFile(`./resources${request.url}`, "utf-8", (err, content) => {
    const html = content.replace(element, commentsElement);
    response.writeHead(200, { "content-type": "text/html" });
    response.end(html);
  });
};

const serveFile = (request, response) => {
  const filePath = generateFilePath(request.url);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      servePageNotFound(request, response);
      return;
    }
    const headers = getHeaders(filePath);

    response.statusCode = STATUS_CODES.ok;
    sendHeaders(headers, response);
    response.end(content);
  });
};

const handleRoutes = (request, response, commentsHandler) => {
  if (isRequestForComment(request.url)) {
    handleComment(request, response, commentsHandler);
    return;
  }

  if (isGuestBookRequest(request.url)) {
    serveGuestBook(request, response, commentsHandler);
    return;
  }

  if (isValidUrl(request.url)) {
    serveFile(request, response);
    return;
  }

  servePageNotFound(request, response);
};

module.exports = { handleRoutes };
