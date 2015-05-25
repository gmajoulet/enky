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
    return res.json({
      todo: 'create() is not implemented yet!'
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
