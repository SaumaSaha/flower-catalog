const handle = (request, response) => {
  response.setStatusCode(200);
  response.setContent(`${request.uri} Working`);
  response.send();
};

module.exports = { handle };
