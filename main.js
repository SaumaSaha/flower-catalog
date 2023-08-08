const net = require("node:net");
const { createRequest } = require("./src/parser");
const { Response } = require("./src/response");
const { handle } = require("./src/request-handler");

const handleConnection = (socket) => {
  socket.setEncoding("utf-8");

  socket.on("data", (data) => {
    const request = createRequest(data);
    const response = new Response(socket);
    handle(request, response);
  });
};

const main = () => {
  const server = net.createServer();
  const port = 8000;

  server.on("connection", handleConnection);

  server.listen(port, () => {
    console.log("Server started listening on ", port);
  });
};

main();
