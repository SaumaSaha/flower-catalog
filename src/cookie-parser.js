const parseCookieParams = (cookieParams) => {
  return Object.fromEntries(
    cookieParams.map((cookieParam) => {
      return cookieParam.split("=");
    })
  );
};

const parseCookies = (request, _, next) => {
  const rawCookies = request.headers.cookie || "";
  const cookieParams = rawCookies.split("; ");

  const cookies = parseCookieParams(cookieParams);
  request.cookies = cookies;

  next();
};

module.exports = parseCookies;
