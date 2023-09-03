const express = require("express");
const {
  handleGetCommentsRequest,
  handleGuestBookPageRequest,
  handlePostCommentRequest,
  handleLoginRequest,
  handleLogoutRequest,
  handleLoginStatusRequest,
} = require("./request-handlers");
const parseCookies = require("./cookie-parser");

const addAuthHandlers = (app) => {
  app.get("/login-status", handleLoginStatusRequest);
  app.post("/login", handleLoginRequest);
  app.post("/logout", handleLogoutRequest);
};

const addGuestBookHandlers = (app) => {
  app.get("/pages/guest-book.html", handleGuestBookPageRequest);
  app.get("/guest-book/comments", handleGetCommentsRequest);
  app.post("/guest-book/comment", handlePostCommentRequest);
};

const addMiddleware = (app) => {
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(parseCookies);
};

const createApp = (commentsHandler) => {
  const app = express();
  app.commentsHandler = commentsHandler;

  addMiddleware(app);
  addAuthHandlers(app);
  addGuestBookHandlers(app);

  app.use(express.static("resources"));

  return app;
};

module.exports = createApp;
