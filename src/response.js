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

    return (
      Object.entries(this.#headers)
        .map(([key, value]) => {
          return `${key}: ${value}`;
        })
        .join(CR_LF) + CR_LF.repeat(2)
    );
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

  #formatResponse(statusMessage) {
    return `${this.#protocol}/${this.#version} ${
      this.#statusCode
    } ${statusMessage}\r\n`;
  }

  send() {
    const statusMessage = this.#getStatusMessage();
    const headers = this.#getHeaders();
    const response = this.#formatResponse(statusMessage);

    this.#socket.write(response);
    this.#socket.write(headers);
    this.#socket.write(this.#content, () => this.#socket.end());
  }
}

module.exports = { Response };
