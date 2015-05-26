var base58 = require('base-58'),
  crypto = require('crypto');

module.exports = {
  /**
   * Returns a 21|22 chars length hash to use with the API, to avoid exposing IDs
   *
   * @return {String} 21|22 chars length
   */
  getHash: function() {
    return base58.encode(crypto.randomBytes(16));
  },

  /**
   * Returns a 32 chars length random API Key
   *
   * @return {String} 32 chars API Key
   */
  getApiKey: function() {
    return base58.encode(crypto.randomBytes(32)).substring(0, 32);
  }
};
