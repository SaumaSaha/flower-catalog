const fs = require("fs");

const { CommentsHandler } = require("./src/comments-manager");
const createApp = require("./src/app");
const COMMENTS_FILE_PATH = "./comments.json";

const main = () => {
  const commentsHandler = new CommentsHandler(fs, COMMENTS_FILE_PATH);
  commentsHandler.init();
  const app = createApp(commentsHandler);

  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log("Server listening on", port));
};

main();
