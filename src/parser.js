const parserHeader = (headerLine) => {
  const [header, value] = headerLine.split(": ");
  return [header.toUpperCase(), value];
};

const parseHeaders = (headerLines) =>
  Object.fromEntries(headerLines.map(parserHeader));

const createRequest = (requestText) => {
  const [requestLine, ...headerLines] = requestText.split("\r\n");
  const [method, uri, protocol] = requestLine.split(" ");

  return {
    method: method.toUpperCase(),
    uri,
    protocol: protocol.toUpperCase(),
    headers: parseHeaders(headerLines),
  };
};

module.exports = { createRequest };
