const handlers = require("./request-handlers");

const validators = require("./validators");

const handleRoutes = (request, response, commentsHandler) => {
  if (validators.isNotValidMethod(request)) {
    handlers.handleMethodNotAllowed(request, response);
    return;
  }

  if (validators.isNotValidUrl(request)) {
    handlers.handlePageNotFound(request, response);
    return;
  }

  const routes = [
    {
      validator: validators.isRequestForPostComment,
      handler: handlers.handlePostCommentRequest,
    },
    {
      validator: validators.isRequestForGetComments,
      handler: handlers.handleGetCommentsRequest,
    },
    {
      validator: validators.isHomeRequest,
      handler: handlers.handleHomeRequest,
    },
    {
      validator: validators.isRequestForGuestBookPage,
      handler: handlers.handleGuestBookPageRequest,
    },
    {
      validator: validators.isLoginRequest,
      handler: handlers.handleLogin,
    },
  ];

  const route = routes.find(({ validator }) => validator(request));

  const handler = route ? route.handler : handlers.handleStaticPageRequest;
  handler(request, response, commentsHandler);
};

module.exports = { handleRoutes };
