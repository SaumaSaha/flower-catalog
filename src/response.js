class Response {
  #socket;
  #statusCode;
  #content;
  #protocol;
  #version;
  #headers;

  constructor(socket, protocol = "HTTP", version = "1.1") {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#content = "";
    this.#protocol = protocol;
    this.#version = version;
    this.#headers = [];
  }

  #getHeaders() {
    const contentLength = this.#content.length;
    const date = new Date().toGMTString();
    this.addHeader("Content-Length", contentLength);
    this.addHeader("Date", date);

    return this.#headers.join("\r\n");
  }

  setStatusCode(statusCode) {
    this.#statusCode = statusCode;
  }

  setContent(content) {
    this.#content = content;
  }

  addHeader(key, value) {
    this.#headers.push(`${key}: ${value}`);
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
    const headers = this.#getHeaders();
    const response = this.#formatResponse(statusMessage, headers);

    this.#socket.write(response);
    this.#socket.write(this.#content, () => this.#socket.end());
  }
}

module.exports = { Response };
