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
    Escrow.find().then(function(escrows) {
      return res.json({ escrows: escrows });
    });
  },

  /**
   * `EscrowController.findOne()`
   */
  findOne: function (req, res) {
    var id = req.param('id');

    Escrow.find(id).then(function(escrow) {
      if (!escrow.length) {
        return res.notFound();
      }

      return res.json({ escrow: escrow });
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
