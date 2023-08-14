const isNotValidUrl = (url) => url.includes("..");

const isGuestBookRequest = (url) => url === "/pages/guest-book.html";

const isRequestForComment = (url) => url.startsWith("/comment?");

const isHomeRequest = (url) => url === "/";

module.exports = {
  isNotValidUrl,
  isGuestBookRequest,
  isRequestForComment,
  isHomeRequest,
};
