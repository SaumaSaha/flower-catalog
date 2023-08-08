const fs = require("fs");

const handle = (request, response) => {
  fs.readFile("./html/index.html", { encoding: "utf-8" }, (error, data) => {
    const statusCode = 200;
    response.setStatusCode(statusCode);
    response.setContent(data);
    response.send();
  });
};

module.exports = { handle };
