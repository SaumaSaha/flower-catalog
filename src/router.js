const handlers = require("./request-handlers");

const validators = require("./validators");

const handleGetRequest = (request, response, commentsStorage) => {
  const routes = [
    {
      validator: validators.isNotValidUrl,
      handler: handlers.handlePageNotFound,
    },
    {
      validator: validators.isGuestBookRequest,
      handler: handlers.handleGuestBookRequest,
    },
    {
      validator: validators.isHomeRequest,
      handler: handlers.handleHomeRequest,
    },
  ];

  const route = routes.find(({ validator }) => validator(request));

  const handler = route ? route.handler : handlers.handleStaticPageRequest;
  handler(request, response, commentsStorage);
};

const handlePostRequest = (request, response, commentsStorage) => {
  const routes = [
    {
      validator: validators.isRequestForComment,
      handler: handlers.handleCommentRequest,
    },
  ];

  const route = routes.find(({ validator }) => validator(request));

  route.handler(request, response, commentsStorage);
};

const handleRoutes = (request, response, commentsStorage) => {
  if (validators.isNotValidMethod(request)) {
    handlers.handleMethodNotAllowed(request, response);
    return;
  }

  if (validators.isGetRequest(request.method)) {
    handleGetRequest(request, response, commentsStorage);
    return;
  }

  handlePostRequest(request, response, commentsStorage);
  return;
};

module.exports = { handleRoutes };
