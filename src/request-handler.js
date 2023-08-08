const fs = require("fs");

const handle = (request, response) => {
  const content = fs.readFileSync("./html/index.html", "utf-8");
  response.setStatusCode(200);
  response.setContent(content);
  response.send();
};

module.exports = { handle };
