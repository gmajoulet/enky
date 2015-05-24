var Sails = require('sails'),
  Barrels = require('barrels');

// Starting the Sails app with the test connection (sails-memory database) and
// reseting the database (migrate: drop) to load the fixtures
before(function(done) {
  Sails.lift({
    log: {
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

    // Load our fixtures since we just dropped the database
    var barrels = new Barrels();

    barrels.populate(function(err) {
      done(err);
    });
  });
});

// After the tests, shutting down the Sails app
after(function (done) {
  console.log();
  Sails.lower(done);
});
