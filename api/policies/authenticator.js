var co = require('co');

module.exports = function(req, res, next) {
  // We get the apikey from the headers, or from the query parameters
  var apiKey = req.headers.apikey || req.param('apikey');

  // If no API Key, respond with an error
  if (!apiKey) {
    return res.apiError(401, 'Unauthorized', 'Could not authenticate: missing `apikey`');
  }

  co(function* () {
    // Get the account from its apikey
    req.session.account = yield AccountService.get({ apiKey: apiKey });
    next();
  }).catch(function(error) {
    // No account found with this API key
    return res.apiError(401, 'Unauthorized', error);
  });
};
