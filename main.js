const fs = require("node:fs");
const http = require("node:http");

const { CommentsHandler } = require("./src/comments-manager");
const { createRouter } = require("./src/router-creator");
const COMMENTS_FILE_PATH = "./comments.json";

const parseCookies = (cookieParams = "") => {
  const cookies = cookieParams.split("; ");

  return Object.fromEntries(cookies.map((cookie) => cookie.split("=")));
};

const main = () => {
  const commentsHandler = new CommentsHandler(fs, COMMENTS_FILE_PATH);
  commentsHandler.init();
  const router = createRouter();

  const server = http.createServer((request, response) => {
    console.log(request.method, request.url);
    request.cookies = parseCookies(request.headers.cookie);
    request.commentsHandler = commentsHandler;

    router.route(request, response);
  });

  const port = 8000;
  server.listen(port, () => console.log("Server listening on", port));
};

main();
