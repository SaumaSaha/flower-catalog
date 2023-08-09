class Response {
  #socket;
  #statusCode;
  #content;
  #contentType;
  #protocol;
  #version;

  constructor(socket, protocol = "HTTP", version = "1.1") {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#content = "";
    this.#contentType = "text/html";
    this.#protocol = protocol;
    this.#version = version;
  }

  #getDefaultHeader() {
    const contentLength = this.#content.length;
    const date = new Date().toGMTString();
    const contentLengthHeader = `Content-Length: ${contentLength}`;
    const dateHeader = `Date: ${date}`;
    const contentTypeHeader = `Content-Type: ${this.#contentType}`;

    return [contentLengthHeader, dateHeader, contentTypeHeader].join("\r\n");
  }

  setStatusCode(statusCode) {
    this.#statusCode = statusCode;
  }

  setContent(content, contentType) {
    this.#content = content;
    this.#contentType = contentType;
  }

  #getStatusMessage() {
    const statusMessages = {
      200: "OK",
      400: "BAD_REQUEST",
      404: "NOT_FOUND",
      405: "METHOD_NOT_ALLOWED",
    };

    return statusMessages[this.#statusCode];
  }

  #formatResponse(statusMessage, headers) {
    return `${this.#protocol}/${this.#version} ${
      this.#statusCode
    } ${statusMessage}\r\n${headers}\r\n\n`;
  }

  send() {
    const statusMessage = this.#getStatusMessage();
    const headers = this.#getDefaultHeader();
    const response = this.#formatResponse(statusMessage, headers);

    this.#socket.write(response);
    this.#socket.write(this.#content);
    this.#socket.end();
  }
}

module.exports = { Response };
