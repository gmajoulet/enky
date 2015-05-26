var expect = require('chai').expect;

describe('services/RandomService', function() {
  describe('getHash', function() {
    it('should get some different 20 chars hashes', function() {
      var firstHash = RandomService.getHash(),
        secondHash = RandomService.getHash();

      expect(firstHash).to.be.a('string');
      expect(firstHash).to.have.length(20);
      expect(secondHash).to.be.a('string');
      expect(secondHash).to.have.length(20);
      expect(firstHash).not.to.equal(secondHash);
    });
  });

  describe('getApiKey', function() {
    it('should get some different 32 chars API keys', function() {
      var firstKey = RandomService.getApiKey(),
        secondKey = RandomService.getApiKey();

      expect(firstKey).to.be.a('string');
      expect(firstKey).to.have.length(32);
      expect(secondKey).to.be.a('string');
      expect(secondKey).to.have.length(32);
      expect(firstKey).not.to.equal(secondKey);
    });
  });
});
