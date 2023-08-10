const http = require("node:http");
const { handle } = require("./src/request-handler");

const main = () => {
  const server = http.createServer(handle);

  const port = 9000;
  server.listen(port, () => console.log("Server listening on", port));
};

main();
