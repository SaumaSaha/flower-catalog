class Response {
  #socket;
  #statusCode;
  #content;
  #protocol;
  #version;

  constructor(socket, protocol = "HTTP", version = "1.1") {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#content = "";
    this.#protocol = protocol;
    this.#version = version;
  }

  #getDefaultHeader() {
    const contentLength = this.#content.length;
    const date = new Date().toGMTString();

    return `Content-Length: ${contentLength}\r\nDate: ${date}`;
  }

  setStatusCode(statusCode) {
    this.#statusCode = statusCode;
  }

  setContent(content) {
    this.#content = content + "\n";
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
    } ${statusMessage}\r\n${headers}\r\n\n${this.#content}`;
  }

  send() {
    const statusMessage = this.#getStatusMessage();
    const headers = this.#getDefaultHeader();
    const response = this.#formatResponse(statusMessage, headers);

    this.#socket.write(response);
    this.#socket.end();
  }
}

module.exports = { Response };
