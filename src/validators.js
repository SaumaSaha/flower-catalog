const fs = require("fs");

const isGetRequest = (method) => method === "GET";
const isPostRequest = (method) => method === "POST";

const isNotValidUrl = (request) => request.url.includes("..");

const isNotValidMethod = (request) =>
  fs.existsSync(`./resources${request.url}`) && isPostRequest(request.method);

const isRequestForPostComment = (request) =>
  request.url === "/pages/guest-book/comment" && isPostRequest(request.method);

const isRequestForGetComments = (request) =>
  request.url === "/pages/guest-book/comments" && isGetRequest(request.method);

const isRequestForGuestBookPage = (request) =>
  request.url === "/pages/guest-book.html" && isGetRequest(request.method);

const isLoginRequest = (request) =>
  request.url === "/login" && isPostRequest(request.method);

const isHomeRequest = (request) => request.url === "/";

module.exports = {
  isNotValidUrl,
  isNotValidMethod,
  isRequestForPostComment,
  isRequestForGetComments,
  isRequestForGuestBookPage,
  isHomeRequest,
  isLoginRequest,
  isGetRequest,
  isPostRequest,
};
