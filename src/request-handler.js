const fs = require("fs");
const { createCommentsElement } = require("./html-generator");
const GUEST_BOOK_HTML = fs.readFileSync(
  "./resources/pages/guest-book.html",
  "utf-8"
);

const STATUS_CODES = {
  ok: 200,
  notFound: 404,
  serverError: 500,
  methodNotAllowed: 405,
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
  inline: "inline",
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

const sendResponse = (content, request, response) => {
  const headers = getHeaders(request.url);

  Object.entries(headers).forEach(([name, value]) => {
    response.setHeader(name, value);
  });

  response.end(content);
};

const handlePageNotFound = (request, response) => {
  response.statusCode = STATUS_CODES.notFound;
  response.end(`${request.url} Not Found`);
};

const handleMethodNotAllowed = (_, response) => {
  response.statusCode = STATUS_CODES.methodNotAllowed;
  response.end(`Method Not Found`);
};

const handleInternalServerError = (_, response) => {
  response.statusCode = STATUS_CODES.methodNotAllowed;
  response.end(`Internal Server Error`);
};

const getComment = (data) => {
  const params = new URLSearchParams(data);

  return Object.fromEntries(params.entries());
};

const handleCommentRequest = (request, response, commentsHandler) => {
  let requestBody = "";

  request.on("data", (data) => (requestBody += data));

  request.on("end", () => {
    const comment = getComment(requestBody);
    comment.date = new Date().toLocaleString();

    commentsHandler.addComment(comment);

    response.writeHead(303, { location: "/pages/guest-book.html" });
    response.end();
  });
};

const handleGuestBookRequest = (request, response, commentsHandler) => {
  const placeholder = "All Comments";

  const comments = commentsHandler.getComments();
  const commentsElement = createCommentsElement(comments);
  const content = GUEST_BOOK_HTML.replace(placeholder, commentsElement);

  sendResponse(content, request, response);
};

const handleHomeRequest = (_, response) => {
  response.writeHead(302, { location: "/pages/index.html" });
  response.end();
};

const handleStaticPageRequest = (request, response) => {
  const filePath = `./resources${request.url}`;

  fs.readFile(filePath, (error, content) => {
    if (error) {
      handleInternalServerError(request, response);
      return;
    }
    sendResponse(content, request, response);
  });
};

module.exports = {
  handleStaticPageRequest,
  handleGuestBookRequest,
  handleCommentRequest,
  handleHomeRequest,
  handlePageNotFound,
  handleMethodNotAllowed,
};
