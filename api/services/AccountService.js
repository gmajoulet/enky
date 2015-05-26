var co = require('co');

module.exports = {
  /**
   * Get all the Accounts
   *
   * @return {Promise}
   */
  getAll: function() {
    return Account.find();
  },

  /**
   * Get the Account for the given attributes
   * If no attributes are passed, return all the Accounts (alias for getAll)
   *
   * @param  {Object}  attributes { hash: hash }
   * @return {Promise}  Resolved with an object (single Account) or array (all)
   */
  get: function(attributes) {
    if (!attributes) {
      return this.getAll();
    }

    return new Promise(function(resolve, reject) {
      co(function* () {
        // The `find` method always return an array
        // Hash is a unique field, we have either 0 or 1 result
        var accounts = yield Account.find(attributes);

        // If no result
        if (!accounts.length) {
          return reject('account_not_found');
        }

        // Resolve the promise with the first and only possible account
        resolve(accounts[0]);
      });
    });
  },

  create: function(accountData) {
    accountData = accountData || {};

    // Generate an API Key
    accountData.apiKey = RandomService.getApiKey();

    return Account.create(accountData);
  },

  update: function(hash) {
    throw 'Account.update is not implemented yet!';
  },

  destroy: function(hash) {
    throw 'Account.destroy is not implemented yet!';
  }
};
