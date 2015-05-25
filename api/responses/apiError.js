/**
 * API error handler
 *
 * Usage:
 * return res.apiError(statusCode, code, message, invalidAttributes);
 *
 * e.g.:
 * ```
 * return res.apiError(404, 'escrow_not_found', 'No escrow found');
 * ```
 */

module.exports = function apiError(statusCode, code, message, invalidAttributes) {
  var req = this.req,
    res = this.res;

  statusCode = statusCode || 400;
  code = code || 'bad_request';
  message = message || '';

  // Set the response status code
  res.status(statusCode);

  var responseData = {
    code: code,
    message: message
  };

  // If it's a validation error
  if ('object' === typeof invalidAttributes) {
    responseData.invalidAttributes = invalidAttributes;
  }

  // Send the response with the error code and message
  return res.json(responseData);
};
