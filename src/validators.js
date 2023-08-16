const fs = require("fs");

const isGetRequest = (method) => method === "GET";
const isPostRequest = (method) => method === "POST";

const isNotValidUrl = (request) => request.url.includes("..");

const isNotValidMethod = (request) =>
  fs.existsSync(`./resources${request.url}`) && isPostRequest(request.method);

const isGuestBookRequest = (request) =>
  request.url === "/pages/guest-book.html";

const isRequestForComment = (request) =>
  request.url === "/pages/guest-book-entry";

const isHomeRequest = (request) => request.url === "/";

module.exports = {
  isNotValidUrl,
  isNotValidMethod,
  isGuestBookRequest,
  isRequestForComment,
  isHomeRequest,
  isGetRequest,
  isPostRequest,
};
