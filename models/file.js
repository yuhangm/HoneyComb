// Generated by CoffeeScript 1.4.0
(function() {
  var Chunk, GridStore, ObjectID, Server, db, mongodb;

  mongodb = require('mongodb');

  ObjectID = mongodb.ObjectID;

  GridStore = mongodb.GridStore;

  Chunk = mongodb.Chunk;

  Server = mongodb.Server;

  db = new mongodb.Db('honeycomb', new mongodb.Server('ds037817.mongolab.com', 37817), {
    safe: true
  });

  exports.setupFiles = function() {
    return db.open(function(err, db) {
      if (!err) {
        return db.authenticate('admin', 'SPSU2012', function(err, data) {
          if (err) {
            return console.log(err);
          } else {
            return console.log('database open');
          }
        });
      } else {
        return console.log(err);
      }
    });
  };

  exports.upload = function(user, folder, file, cb) {
    var filename, gs, i, named;
    filename = file.filename;
    named = false;
    i = 0;
    while (!named) {
      if (user.files.indexOf(folder + '~' + file.filename) === -1) {
        filename = file.filename;
        named = true;
      } else {
        if (user.files.indexOf(folder + '~' + file.filename + '(' + i + ')') === -1) {
          filename = file.filename + '(' + i + ')';
          named = true;
        }
      }
      i++;
    }
    gs = new GridStore(db, user.username + '/' + folder + '~' + filename, 'w', {
      'content_type': file.type,
      'metadata': {
        author: user.username
      },
      'chunk_size': 1024 * 256
    });
    return gs.writeFile(file.path, function(err, gs) {
      if (!err) {
        if (user.files.indexOf(filename) === -1) {
          user.files.push(folder + '~' + filename);
          return user.save(function(err, doc) {
            return cb(err);
          });
        } else {
          return cb(null);
        }
      } else {
        return cb(err);
      }
    });
  };

  exports.read = function(username, filename, cb) {
    var gs;
    gs = new GridStore(db, username + '/' + filename, 'r');
    return gs.open(function(err, gs) {
      return gs.read(cb);
    });
  };

  exports.remove = function(username, filename, cb) {
    var gs;
    gs = new GridStore(db, username + '/' + filename, 'r');
    return gs.open(function(err, gs) {
      return gs.unlink(cb);
    });
  };

}).call(this);
