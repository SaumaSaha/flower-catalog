const http = require("node:http");
const { handleRoutes } = require("./src/request-handler");

const main = () => {
  const server = http.createServer(handleRoutes);

  const port = 8000;
  server.listen(port, () => console.log("Server listening on", port));
};

main();
