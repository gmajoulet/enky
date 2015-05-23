require("sails-test-helper");

describe(TEST_NAME, function() {
  describe('GET /escrows', function() {
    it('should get all the escrows', function(done) {
      request.get('/api/1/escrows')
        .expect(200)
        .expect(function(res) {
          expect(res.body.escrows).to.be.an('array');
          expect(res.body.escrows).to.have.length(3);
        })
        .end(done);
    });
  });

  describe('GET /escrows/:id', function() {
    it('should get the escrow', function(done) {
      request.get('/api/1/escrows/1')
        .expect(200)
        .expect(function(res) {
          expect(res.body.escrow).to.be.an('object');
          expect(res.body.escrow).to.have.property('status');
        })
        .end(done);
    });

    it('should not get an escrow that does not exist', function(done) {
      request.get('/api/1/escrows/9999999')
        .expect(404)
        .end(done);
    });
  });
});
