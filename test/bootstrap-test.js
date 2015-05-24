var Sails = require('sails'),
  Barrels = require('barrels');

// Starting the Sails app with the test connection (sails-memory database) and
// reseting the database (migrate: drop) to load the fixtures
before(function(done) {
  Sails.lift({
    log: {
      // Comment this line if you're trying to debug a silent error such as a
      // fixture validation error
      level: 'error'
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    }
  }, function(err) {
    if (err) {
      return done(err);
    }

    done();
  });
});

beforeEach(function(done) {
  // Load fixtures again before every test
  var barrels = new Barrels();

  barrels.populate(function(err) {
    done(err);
  });
});

// After the tests, shutting down the Sails app
after(function (done) {
  console.log();
  Sails.lower(done);
});
