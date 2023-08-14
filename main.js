const http = require("node:http");
const { handleRoutes } = require("./src/router");
const { CommentsManager } = require("./src/comments-manager");
const fs = require("node:fs");

const main = () => {
  const commentsFilePath = "./comments.json";
  const commentsManager = new CommentsManager(fs, commentsFilePath);
  commentsManager.fetchComments();

  const server = http.createServer((request, response) => {
    console.log(request.method, request.url);
    handleRoutes(request, response, commentsManager);
  });

  const port = 8000;
  server.listen(port, () => console.log("Server listening on", port));
};

main();
