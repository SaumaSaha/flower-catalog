const { Router } = require("./router");

const {
  handleGetCommentsRequest,
  handlePostCommentRequest,
  handleHomeRequest,
  handleGuestBookPageRequest,
  handleLoginRequest,
  handleMethodNotAllowed,
  handleStaticPageRequest,
  handleLogoutRequest,
  handleUserNameRequest,
  handleLoginStatusRequest,
} = require("./request-handlers");

const createRouter = () => {
  const router = new Router();

  router.addHandler("GET", "^/$", handleHomeRequest);
  router.addHandler(
    "GET",
    "^/pages/guest-book/comments$",
    handleGetCommentsRequest
  );
  router.addHandler(
    "POST",
    "^/pages/guest-book/comment$",
    handlePostCommentRequest
  );
  router.addHandler(
    "GET",
    "^/pages/guest-book.html$",
    handleGuestBookPageRequest
  );
  router.addHandler("GET", "^/login-status$", handleLoginStatusRequest);
  router.addHandler("POST", "^/login$", handleLoginRequest);
  router.addHandler("POST", "^/logout$", handleLogoutRequest);
  router.addHandler("GET", "^.*$", handleStaticPageRequest);
  router.addHandler("POST", "^.*$", handleMethodNotAllowed);

  return router;
};

module.exports = { createRouter };
