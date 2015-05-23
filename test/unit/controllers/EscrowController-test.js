require("sails-test-helper");

describe(TEST_NAME, function() {
  describe('GET escrows', function() {
    it('should get all the fixtures escrows', function(done) {
      request.get('/api/1/escrows')
        .expect(200)
        .end(done);
    });
  });
});
