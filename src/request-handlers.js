const { STATUS_CODES } = require("./utils");
const pwd = process.env.PWD;

const isUserLoggedIn = (request) => {
  return "username" in request.cookies;
};

const handleMethodNotAllowed = (_, response) => {
  response.status(STATUS_CODES.methodNotAllowed).send("Method Not Found");
};

const handleGetCommentsRequest = (request, response) => {
  const { commentsHandler } = request.app;

  response.status(STATUS_CODES.ok).json(commentsHandler.getComments());
};

const handlePostCommentRequest = (request, response) => {
  if (!isUserLoggedIn(request)) {
    response.status(STATUS_CODES.unauthorized);
    response.redirect("/pages/login.html");
    return;
  }
  const { commentsHandler } = request.app;

  const comment = request.body;

  comment.timeStamp = new Date().toLocaleString();
  comment.username = request.cookies.username;

  const onCommentAdd = () => {
    response.status(STATUS_CODES.created).json(comment);
  };

  commentsHandler.addComment(comment, onCommentAdd);
};

const handleLoginRequest = (request, response) => {
  const { username } = request.body;

  response.cookie("username", username);
  response.redirect(STATUS_CODES.seeOther, "/");
};

const handleLogoutRequest = (_, response) => {
  response.clearCookie("username");
  response.redirect(STATUS_CODES.seeOther, "/");
};

const handleLoginStatusRequest = (request, response) => {
  if (request.cookies.username) {
    const username = request.cookies.username;
    response.json({ loggedIn: true, username });
    return;
  }

  response.json({ loggedIn: false, username: null });
};

const handleGuestBookPageRequest = (request, response) => {
  if (isUserLoggedIn(request)) {
    response.sendFile(pwd + "/resources/pages/guest-book.html");
    return;
  }

  response.redirect(303, "/pages/login.html");
};

module.exports = {
  handlePostCommentRequest,
  handleGetCommentsRequest,
  handleGuestBookPageRequest,
  handleLoginRequest,
  handleLogoutRequest,
  handleMethodNotAllowed,
  handleLoginStatusRequest,
};
