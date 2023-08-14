const fs = require("fs");

const isGetRequest = (method) => method === "GET";

const isPostRequest = (method) => method === "POST";

const isNotValidUrl = (request) => request.url.includes("..");

const isGuestBookRequest = (request) =>
  request.url === "/pages/guest-book.html" && isGetRequest(request.method);

const isRequestForComment = (request) =>
  request.url === "/pages/guest-book-entry" && isPostRequest(request.method);

const isHomeRequest = (request) =>
  request.url === "/" && isGetRequest(request.method);

const isStaticPageRequest = (request) =>
  fs.existsSync(`./resources${request.url}`) && isGetRequest(request.method);

module.exports = {
  isNotValidUrl,
  isGuestBookRequest,
  isRequestForComment,
  isHomeRequest,
  isStaticPageRequest,
};
