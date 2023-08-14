const {
  handlePageNotFound,
  handleCommentRequest,
  handleGuestBookRequest,
  handleFileRequest,
  handleHomeRequest,
} = require("./request-handler");

const {
  isNotValidUrl,
  isRequestForComment,
  isGuestBookRequest,
  isHomeRequest,
} = require("./validators");

const handleRoutes = (request, response, commentsHandler) => {
  const validators = [
    { validator: isNotValidUrl, handler: handlePageNotFound },
    { validator: isRequestForComment, handler: handleCommentRequest },
    { validator: isGuestBookRequest, handler: handleGuestBookRequest },
    { validator: isHomeRequest, handler: handleHomeRequest },
  ];

  const validator = validators.find(({ validator }) => validator(request.url));

  if (!validator) {
    handleFileRequest(request, response);
    return;
  }

  validator.handler(request, response, commentsHandler);
  return;
};

module.exports = { handleRoutes };
