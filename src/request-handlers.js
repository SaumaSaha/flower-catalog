const fs = require("fs");
const { getHeaders, STATUS_CODES } = require("./utils");

const sendResponse = (content, request, response) => {
  const headers = getHeaders(request.url);

  Object.entries(headers).forEach(([name, value]) => {
    response.setHeader(name, value);
  });

  response.end(content);
};

const isUserLoggedIn = (req) => {
  return "username" in req.cookies;
};

const onChunkEnd = (request, requestBody, response) => {
  const { commentsHandler } = request;
  const comment = JSON.parse(requestBody);
  comment.timeStamp = new Date().toLocaleString();
  comment["username"] = request.cookies["username"];

  const onCommentAdd = () => {
    response.writeHead(STATUS_CODES.created, {
      "content-type": "application/json",
    });
    response.end(JSON.stringify(comment));
  };

  commentsHandler.addComment(comment, onCommentAdd);
};

const redirectToLoginPage = (_, response) => {
  response.statusCode = STATUS_CODES.seeOther;
  response.setHeader("location", "/pages/login.html");
  response.end();
};

const redirectToHomePage = (_, response) => {
  response.statusCode = STATUS_CODES.seeOther;
  response.setHeader("location", "/");
  response.end();
};

const handlePageNotFound = (request, response) => {
  response.statusCode = STATUS_CODES.notFound;
  response.end(`${request.url} Not Found`);
};

const handleMethodNotAllowed = (_, response) => {
  response.statusCode = STATUS_CODES.methodNotAllowed;
  response.end("Method Not Found");
};

const handleGetCommentsRequest = (request, response) => {
  const { commentsHandler } = request;
  response.setHeader("content-type", "application/json");
  response.statusCode = STATUS_CODES.ok;
  response.end(JSON.stringify(commentsHandler.getComments()));
};

const handlePostCommentRequest = (request, response) => {
  if (!isUserLoggedIn(request)) {
    response.statusCode = 401;
    response.setHeader("location", "/pages/login.html");
    response.end();
    return;
  }
  let requestBody = "";

  request.on("data", (data) => (requestBody += data));

  request.on("end", () => {
    onChunkEnd(request, requestBody, response);
  });
};

const handleHomeRequest = (_, response) => {
  response.writeHead(STATUS_CODES.seeOther, { location: "/index.html" });
  response.end();
};

const handleLoginRequest = (request, response) => {
  let reqBody = "";
  request.on("data", (data) => {
    reqBody += data;
  });

  request.on("end", () => {
    const name = new URLSearchParams(reqBody).get("username");
    response.setHeader("set-cookie", `username=${name}`);
    redirectToHomePage(request, response);
  });
};

const handleLogoutRequest = (_, response) => {
  response.statusCode = STATUS_CODES.ok;
  response.setHeader("set-cookie", "username=; max-age=0");
  response.setHeader("location", "/index.html");
  response.end();
};

const handleLoginStatusRequest = (request, response) => {
  const loggedIn = request.cookies.username ? true : false;
  const username = request.cookies.username;
  response.statusCode = STATUS_CODES.ok;
  response.setHeader("content-type", "application/json");
  response.end(JSON.stringify({ loggedIn, username }));
};

const handleGuestBookPageRequest = (request, response) => {
  if (isUserLoggedIn(request)) {
    handleStaticPageRequest(request, response);
    return;
  }

  redirectToLoginPage(request, response);
};

const handleStaticPageRequest = (request, response) => {
  const filePath = `./resources${request.url}`;

  fs.readFile(filePath, (error, content) => {
    if (error) {
      handlePageNotFound(request, response);
      return;
    }
    sendResponse(content, request, response);
  });
};

module.exports = {
  handleStaticPageRequest,
  handlePostCommentRequest,
  handleGetCommentsRequest,
  handleGuestBookPageRequest,
  handleHomeRequest,
  handleLoginRequest,
  handleLogoutRequest,
  handleMethodNotAllowed,
  handleLoginStatusRequest,
};
