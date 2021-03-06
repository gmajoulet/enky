var bcrypt = require('bcrypt');

module.exports = {
  /**
   * Escrow model attributes
   *
   * @type {Object}
   */
  attributes: {
    hash: {
      type: 'string',
      primaryKey: true,
      unique: true,
      required: true,
      regex: /^[a-zA-Z0-9]{20}$/
    },
    status: {
      type: 'string',
      enum: ['pending', 'regular'],
      defaultsTo: 'pending'
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    salt: {
      type: 'string',
      required: true
    },
    apiKey: {
      type: 'string',
      size: 32,
      required: true
    },

    /**
     * Model serialization tweakings
     *
     * @return {Object}
     */
    toJSON: function() {
      var account = this.toObject();

      // Remove the password and the salt from the serialization
      delete account.password;
      delete account.salt;

      return account;
    }
  },

  /**
   * Lifecycle hook triggered before creating or updating the model
   *
   * @param  {Object}   values   Model attributes
   * @param  {Function} callback
   */
  beforeValidate: function(values, callback) {
    // If there is already a salt, return
    // Otherwise, we set the salt
    if (values.salt) {
      return callback();
    }

    values.salt = bcrypt.genSalt(10, function(error, salt) {
      if (error) {
        return callback(error);
      }

      values.salt = salt;
      callback();
    });
  },

  /**
   * Lifecycle hook triggered before creating the model
   *
   * @param  {Object}   values   Model attributes
   * @param  {Function} callback
   */
  beforeCreate: function(values, callback) {
    // Encrypt the password
    bcrypt.hash(values.password, 10, function(error, hash) {
      if (error) {
        return callback(error);
      }

      values.password = hash;
      callback();
    });
  }
};
