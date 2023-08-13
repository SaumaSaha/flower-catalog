const STATUS_CODES = {
  ok: 200,
  notFound: 404,
};

const MIME_TYPES = {
  html: "text/html",
  plain: "text/plain",
  jpg: "images/jpeg",
  css: "text/css",
  pdf: "application/pdf",
  gif: "images/gif",
  js: "text/javascript",
};

const CONTENT_DISPOSITION = {
  attachment: "attachment",
  inline: "inline",
};

class Router {
  #commentsHandler;
  #fileSystem;

  constructor(commentsHandler, fileSystem) {
    this.#commentsHandler = commentsHandler;
    this.#fileSystem = fileSystem;
  }

  #isValidUrl(url) {
    return !url.includes("..");
  }

  #isGuestBookRequest(url) {
    return url === "/pages/guest-book.html";
  }

  #isRequestForComment(url) {
    return url.includes("/comment?");
  }

  #getQueryParams(url) {
    const queryString = url.split("?").pop();

    return new URLSearchParams(queryString);
  }

  #sendHeaders(headers, response) {
    Object.entries(headers).forEach(([headerName, headerValue]) => {
      response.setHeader(headerName, headerValue);
    });
  }

  #getHeaders(filePath) {
    const headers = {
      html: { "Content-Type": MIME_TYPES.html },
      jpg: { "Content-Type": MIME_TYPES.jpg },
      css: { "Content-Type": MIME_TYPES.css },
      gif: { "Content-Type": MIME_TYPES.gif },
      js: { "Content-Type": MIME_TYPES.js },
      pdf: {
        "Content-Type": MIME_TYPES.pdf,
        "Content-Disposition": CONTENT_DISPOSITION.attachment,
      },
    };

    const extension = filePath.split(".").pop();

    return headers[extension];
  }

  sendRedirect(request, response) {
    response.writeHead(302, { location: "/pages/guest-book.html" });
    response.end();
  }

  handle(request, response) {
    console.log(request.url);
    if (isRequestForComment(request.url)) {
      handleComment(request, response);
      return;
    }

    if (isGuestBookRequest(request.url)) {
      serveGuestBook(request, response);
      return;
    }

    if (isValidUrl(request.url)) {
      serveFile(request, response);
      return;
    }

    servePageNotFound(request, response);
  }

  start() {
    this.#commentsHandler.fetchComments();
  }
}

module.exports = { Router };
