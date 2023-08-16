const http = require("node:http");
const { handleRoutes } = require("./src/router");
const { CommentsHandler } = require("./src/comments-manager");
const fs = require("node:fs");

const main = () => {
  const commentsFilePath = "./comments.json";
  const commentsHandler = new CommentsHandler(fs, commentsFilePath);
  commentsHandler.init();

  const server = http.createServer((request, response) => {
    console.log(request.method, request.url);
    handleRoutes(request, response, commentsHandler);
  });

  const port = 8000;
  server.listen(port, () => console.log("Server listening on", port));
};

main();
