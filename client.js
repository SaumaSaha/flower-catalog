const net = require("node:net");

const client = net.createConnection(
  { port: parseInt(process.env.PORT) },
  () => {
    const path = process.argv[2];
    client.write(`GET ${path} HTTP/1.1\r\nuser-agent: hello\r\n`);
  }
);
client.on("data", (data) => {
  console.log(data.toString());
  client.end();
});

client.on("end", () => {
  console.log("disconnected from server");
});
