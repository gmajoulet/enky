var request = require('supertest'),
  expect = require('chai').expect;

describe('controllers/EscrowController', function() {
  describe('GET /escrows', function() {
    it('should not be able to get the escrows if we are not authenticated', function(done) {
      request(sails.hooks.http.app)
        .get('/api/1/escrows')
        .set('apikey', 'foo')
        .expect(401)
        .expect(function(res) {
          expect(res.body.code).to.equal('Unauthorized');
          expect(res.body.message).to.equal('account_not_found');
        })
        .end(done);
    });

    it('should get all the escrows', function(done) {
      request(sails.hooks.http.app)
        .get('/api/1/escrows')
        .set('apikey', 'Be7dZcfSXFiCur5dxqf3jJB1iNg5Mi8C')
        .expect(200)
        .expect(function(res) {
          expect(res.body.escrows).to.be.an('array');
          expect(res.body.escrows).to.have.length(3);
        })
        .end(done);
    });
  });

  describe('GET /escrows/:hash', function() {
    it('should not be able to get an escrow if we are not authenticated', function(done) {
      request(sails.hooks.http.app)
        .get('/api/1/escrows/9sCVLPisidWqxApx2bxq')
        .set('apikey', 'foo')
        .expect(401)
        .expect(function(res) {
          expect(res.body.code).to.equal('Unauthorized');
          expect(res.body.message).to.equal('account_not_found');
        })
        .end(done);
    });

    it('should get the escrow', function(done) {
      request(sails.hooks.http.app)
        .get('/api/1/escrows/9sCVLPisidWqxApx2bxq')
        .set('apikey', 'Be7dZcfSXFiCur5dxqf3jJB1iNg5Mi8C')
        .expect(200)
        .expect(function(res) {
          expect(res.body.escrow).to.be.an('object');
          expect(res.body.escrow).to.have.property('status');
        })
        .end(done);
    });

    it('should not get an escrow that does not exist', function(done) {
      request(sails.hooks.http.app)
        .get('/api/1/escrows/9sCVLPisidWq00000000')
        .set('apikey', 'Be7dZcfSXFiCur5dxqf3jJB1iNg5Mi8C')
        .expect(404)
        .expect(function(res) {
          expect(res.body.code).to.equal('escrow_not_found');
        })
        .end(done);
    });
  });
});
