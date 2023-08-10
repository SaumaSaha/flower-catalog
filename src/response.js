const CR_LF = "\r\n";

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
    this.#headers = {};
  }

  #getHeaders() {
    const contentLength = this.#content.length;
    const date = new Date().toGMTString();

    const headers = { "Content-Length": contentLength, "Date": date };

    this.addHeaders(headers);

    return Object.entries(this.#headers)
      .map(([key, value]) => {
        return `${key}: ${value}`;
      })
      .join(CR_LF);
  }

  setStatusCode(statusCode) {
    this.#statusCode = statusCode;
  }

  setContent(content) {
    this.#content = content;
  }

  addHeaders(headers) {
    this.#headers = { ...this.#headers, ...headers };
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

  #formatResponseHead(statusMessage, headers) {
    return `${this.#protocol}/${this.#version} ${
      this.#statusCode
    } ${statusMessage}${CR_LF}${headers}${CR_LF.repeat(2)}`;
  }

  send() {
    const statusMessage = this.#getStatusMessage();
    const headers = this.#getHeaders();
    const responseHead = this.#formatResponseHead(statusMessage, headers);

    this.#socket.write(responseHead);
    this.#socket.write(this.#content, () => this.#socket.end());
  }
}

module.exports = { Response };
