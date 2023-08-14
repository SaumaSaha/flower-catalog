const fs = require("fs");

const isGetRequest = (method) => method === "GET";

const isPostRequest = (method) => method === "POST";

const isNotValidUrl = (request) =>
  request.url.includes("..") || !fs.existsSync(`./resources${request.url}`);

const isNotValidMethod = (request) =>
  fs.existsSync(`./resources${request.url}`) && isPostRequest(request.method);

const isGuestBookRequest = (request) =>
  request.url === "/pages/guest-book.html" && isGetRequest(request.method);

const isRequestForComment = (request) =>
  request.url === "/pages/guest-book-entry" && isPostRequest(request.method);

const isHomeRequest = (request) =>
  request.url === "/" && isGetRequest(request.method);

const isStaticPageRequest = (request) => isGetRequest(request.method);

module.exports = {
  isNotValidUrl,
  isNotValidMethod,
  isGuestBookRequest,
  isRequestForComment,
  isHomeRequest,
  isStaticPageRequest,
};
