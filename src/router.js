const {
  handlePageNotFound,
  handleCommentRequest,
  handleGuestBookRequest,
  handleStaticPageRequest,
  handleHomeRequest,
} = require("./request-handler");

const {
  isNotValidUrl,
  isRequestForComment,
  isGuestBookRequest,
  isHomeRequest,
  isStaticPageRequest,
} = require("./validators");

const handleRoutes = (request, response, commentsHandler) => {
  const validators = [
    { validator: isNotValidUrl, handler: handlePageNotFound },
    { validator: isRequestForComment, handler: handleCommentRequest },
    { validator: isGuestBookRequest, handler: handleGuestBookRequest },
    { validator: isHomeRequest, handler: handleHomeRequest },
    { validator: isStaticPageRequest, handler: handleStaticPageRequest },
  ];

  const validator = validators.find(({ validator }) => validator(request));

  validator.handler(request, response, commentsHandler);
  return;
};

module.exports = { handleRoutes };
