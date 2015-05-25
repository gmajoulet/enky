var request = require('supertest'),
  expect = require('chai').expect;

describe('controllers/AccountController', function() {
  describe('GET /accounts', function() {
    it('should get all the accounts', function(done) {
      request(sails.hooks.http.app)
        .get('/api/1/accounts')
        .expect(200)
        .expect(function(res) {
          expect(res.body.accounts).to.be.an('array');
          expect(res.body.accounts).to.have.length(2);
        })
        .end(done);
    });
  });

  describe('GET /accounts/:hash', function() {
    it('should get the account', function(done) {
      request(sails.hooks.http.app)
        .get('/api/1/accounts/9sCVLPisidWqxApx2bxqYX')
        .expect(200)
        .expect(function(res) {
          expect(res.body.account).to.be.an('object');
          expect(res.body.account).to.have.property('status');
        })
        .end(done);
    });

    it('should not get an account that does not exist', function(done) {
      request(sails.hooks.http.app)
        .get('/api/1/accounts/9sCVLPisidWq0000000000')
        .expect(404)
        .expect(function(res) {
          expect(res.body.code).to.equal('account_not_found');
        })
        .end(done);
    });
  });
});
