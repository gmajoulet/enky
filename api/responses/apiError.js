/**
 * API error handler
 *
 * Usage:
 * return res.apiError();
 * return res.apiError(options);
 *
 * e.g.:
 * ```
 * return res.apiError({
 *   statusCode: 404,
 *   code: 'escrow_not_found',
 *   message: 'No escrow found'
 * });
 * ```
 */

var extend = require('util')._extend;

module.exports = function apiError(options) {
  var req = this.req,
    res = this.res;

  options = extend({
    statusCode: 400,
    code: 'bad_request',
    message: ''
  }, options);

  // Set status code
  res.status(options.statusCode);

  // Send the response with the error code and message
  return res.json({
    code: options.code,
    message: options.message
  });
};
