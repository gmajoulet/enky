var expect = require('chai').expect;

describe('services/RandomService', function() {
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
