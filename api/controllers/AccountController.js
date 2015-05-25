var co = require('co');

/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
   * `AccountController.find()`
   */
  find: function (req, res) {
    co(function* () {
      var accounts = yield AccountService.getAll();

      return res.json({ accounts: accounts });
    });
  },

  /**
   * `AccountController.findOne()`
   */
  findOne: function (req, res) {
    co(function* () {
      var hash = req.param('hash'),
        account = yield AccountService.get(hash);

      return res.json({ account: account });
    }).catch(function(error) {
      return res.apiError(404, error);
    });
  },

  /**
   * `AccountController.create()`
   */
  create: function (req, res) {
    co(function* () {
      var accountData = req.param('account'),
        account = yield AccountService.create(accountData);

      return res.status(201).json({ account: account });
    }).catch(function(error) {
      if ('object' === typeof error) {
        error = error.toJSON();

        return res.apiError(error.status, error.error, error.summary, error.invalidAttributes);
      }

      return res.apiError();
    });
  },

  /**
   * `AccountController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }
};
