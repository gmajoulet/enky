var co = require('co');

/**
 * EscrowController
 *
 * @description :: Server-side logic for managing escrows
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * `EscrowController.find()`
   */
  find: function (req, res) {
    co(function* () {
      var escrows = yield Escrow.find();

      return res.json({ escrows: escrows });
    });
  },

  /**
   * `EscrowController.findOne()`
   */
  findOne: function (req, res) {
    co(function* () {
      var hash = req.param('hash'),
        escrows = yield Escrow.find({ hash: hash });

      if (!escrows.length) {
        throw 'Not found';
      }

      // Escrow.find method always return an Array, so we get the first result
      // since we know the ID to be unique, there is either 0 or 1 result
      return res.json({ escrow: escrows[0] });
    }).catch(function(error) {
      return res.notFound(error);
    });
  },

  /**
   * `EscrowController.create()`
   */
  create: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },

  /**
   * `EscrowController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },

  /**
   * `EscrowController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  },

  /**
   * `EscrowController.release()`
   */
  release: function (req, res) {
    return res.json({
      todo: 'release() is not implemented yet!'
    });
  },

  /**
   * `EscrowController.refund()`
   */
  refund: function (req, res) {
    return res.json({
      todo: 'refund() is not implemented yet!'
    });
  }
};
