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
      enum: ['funding', 'funded', 'released', 'refunded']
    },
    refundAddress: {
      type: 'string',
      size: 35,
      regex: /^[123][a-zA-Z0-9]{26,34}$/,
      required: true
    },
    payoutAddress: {
      type: 'string',
      size: 35,
      regex: /^[123][a-zA-Z0-9]{26,34}$/,
      required: true
    },
    fundingAddress: {
      type: 'string',
      size: 35,
      regex: /^[123][a-zA-Z0-9]{26,34}$/,
      required: true
    },
    amount: {
      type: 'integer',
      defaultsTo: 0
    },
    expectedAmount: {
      type: 'integer',
      required: true
    }
    // seller: {
    //   model:'user',
    //   required: true
    // },
    // buyer: {
    //   model: 'user',
    //   required: true
    // }
  }
};
