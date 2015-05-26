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
        .get('/api/1/accounts/9sCVLPisidWqxApx2bxq')
        .expect(200)
        .expect(function(res) {
          expect(res.body.account).to.be.an('object');
          expect(res.body.account).to.have.property('status');
          expect(res.body.account).to.have.property('email');
          expect(res.body.account).to.have.property('apiKey');
          expect(res.body.account).not.to.have.property('password');
          expect(res.body.account).not.to.have.property('salt');
        })
        .end(done);
    });

    it('should not get an account that does not exist', function(done) {
      request(sails.hooks.http.app)
        .get('/api/1/accounts/9sCVLPisidWq00000000')
        .expect(404)
        .expect(function(res) {
          expect(res.body.code).to.equal('account_not_found');
        })
        .end(done);
    });
  });

  describe('POST /accounts/:hash', function() {
    it('should not create an account if the validation fails (1 attribute)', function(done) {
      request(sails.hooks.http.app)
        .post('/api/1/accounts')
        .send({
          account: {
            email: 'foo@enky',
            password: 'newaccount',
            hash: '9sCVLPisidWq00000001'
          }
        })
        .expect(400)
        .expect(function(res) {
          expect(res.body.code).to.equal('E_VALIDATION');
          expect(res.body.message).to.equal('1 attribute is invalid');
          expect(res.body.invalidAttributes).to.have.property('email');
          expect(res.body.invalidAttributes).not.to.have.property('hash');
          expect(res.body.invalidAttributes).not.to.have.property('password');
        })
        .end(done);
    });

    it('should not create an account if the validation fails (2 attributes)', function(done) {
      request(sails.hooks.http.app)
        .post('/api/1/accounts')
        .send({
          account: {
            email: 'foo@enky',
            password: 'newaccount'
          }
        })
        .expect(400)
        .expect(function(res) {
          expect(res.body.code).to.equal('E_VALIDATION');
          expect(res.body.message).to.equal('2 attributes are invalid');
          expect(res.body.invalidAttributes).to.have.property('email');
          expect(res.body.invalidAttributes).to.have.property('hash');
          expect(res.body.invalidAttributes).not.to.have.property('password');
        })
        .end(done);
    });

    it('should create an account', function(done) {
      request(sails.hooks.http.app)
        .post('/api/1/accounts')
        .send({
          account: {
            email: 'newaccount@enky.io',
            password: 'newaccount',
            hash: '9sCVLPisidWq00000001'
          }
        })
        .expect(201)
        .expect(function(res) {
          expect(res.body.account).to.be.an('object');
          expect(res.body.account).to.have.property('status');
          expect(res.body.account).to.have.property('email');
          expect(res.body.account).to.have.property('apiKey');
          expect(res.body.account).not.to.have.property('password');
          expect(res.body.account).not.to.have.property('salt');
        })
        .end(done);
    });
  });
});
