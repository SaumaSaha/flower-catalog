const http = require("node:http");
const { handleRoutes } = require("./src/request-handler");
const { CommentsHandler } = require("./src/comments-handler");
const fs = require("node:fs");

const main = () => {
  const commentsFilePath = "./comments.json";
  const commentsHandler = new CommentsHandler(fs, commentsFilePath);
  commentsHandler.fetchComments();

  const server = http.createServer((request, response) =>
    handleRoutes(request, response, commentsHandler)
  );
  
  server.on("close", () => {
    console.log("Server closed");
    commentsHandler.storeComments();
  });

  const port = 8000;
  server.listen(port, () => console.log("Server listening on", port));


  // setTimeout(
  //   () => server.close(() => console.log("Server closed itself")),
  //   10000
  // );
};

main();
