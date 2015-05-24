var base58 = require('base-58'),
  crypto = requir('crypto');

module.exports = {
  /**
   * Returns a 21|22 chars length hash to use with the API, to avoid exposing IDs
   *
   * @return {String} 21|22 chars length
   */
  getHash: function() {
    return base58.encode(crypto.randomBytes(16));
  }
};
