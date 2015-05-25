var co = require('co');

module.exports = {
  /**
   * Get all the Escrows
   *
   * @return {Promise}
   */
  getAll: function() {
    return Escrow.find();
  },

  /**
   * Get the Escrow for the given hash
   * If no hash is passed, return all the Escrows (alias for getAll)
   *
   * @param  {String} hash
   * @return {Promise}  Resolved with an object (single Escrow) or array (all)
   */
  get: function(hash) {
    if (!hash) {
      return this.getAll();
    }

    return new Promise(function(resolve, reject) {
      co(function* () {
        // The `find` method always return an array
        // Hash is a unique field, we have either 0 or 1 result
        var escrows = yield Escrow.find({ hash: hash });

        // If no result
        if (!escrows.length) {
          return reject('escrow_not_found');
        }

        // Resolve the promise with the first and only possible escrow
        resolve(escrows[0]);
      });
    });
  },

  create: function(hash) {
    throw 'Escrow.create is not implemented yet!';
  },

  update: function(hash) {
    throw 'Escrow.update is not implemented yet!';
  },

  destroy: function(hash) {
    throw 'Escrow.destroy is not implemented yet!';
  }
};
