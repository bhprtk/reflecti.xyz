'use strict';

const mongoose = require('mongoose');

const User = require('./user');

// SETS ALBUM SCHEMA
const wallSchema = new mongoose.Schema({
  _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, trim: true, required: true },
  caption: { type: String, required: true },
  reactions: [{
    reactor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reactionUrl: { type: String, required: true },
    emotion: { type: String, required: true }
  }]
}, {
  timestamps: true,
});

// CREATE A NEW ALBUM
wallSchema.statics.new = (ownerId, albumObj, cb) => {
  User.findOne({ _id: ownerId }, (err, dbUser) => {
    if (err || !dbUser) { return cb(err || { error: 'User not found.' }); }

    const album = new Album({
      _owner: ownerId,
      name: albumObj.name,
      category: albumObj.category,
      description: albumObj.description,
    });

    album.save((err, savedAlbum) => {

      dbUser._albums.push(album._id);
      dbUser.save(cb(err, savedAlbum));
    });
  });
};

// EDIT ALBUM DETAILS
wallSchema.statics.edit = (userId, albumId, albumObj, cb) => {
  User.findOne({ _id: userId }, (err, dbUser) => {
    if (err || !dbUser) { return cb(err || { error: 'Invalid username.' }); }

    Album.findOne({ _id: albumId }, (err, dbAlbum) => {
      if (err || !dbAlbum) { return cb(err || { error: 'Inexistent album.' }); }
      if (!dbAlbum._owner.equals(dbUser._id)) {
        return cb({ error: 'You must be the album owner.' });
      }

      dbAlbum.name = albumObj.name;
      dbAlbum.category = albumObj.category;
      dbAlbum.description = albumObj.description;

      dbAlbum.save(cb(err, dbAlbum));
    });
  });
};

 // DELETE ALBUM
wallSchema.statics.delete = (userId, albumId, cb) => {
  User.findOne({ _id: userId }, (err, dbUser) => {
    if (err || !dbUser) { return cb(err || { error: 'Invalid username.' }); }

    Album.findOne({ _id: albumId }, (err, dbAlbum) => {
      if (err || !dbAlbum) {
        return cb(err || { error: 'Inexistent album.' });
      }

      if (!dbAlbum._owner.equals(dbUser._id)) {
        return cb({ error: 'You must be the album owner.' });
      }

      Img.remove({ _album: albumId }, (err) => {
        dbUser._albums.remove({ _id: albumId });
        dbAlbum.remove(cb(err));
      });
    });
  });
};

const Album = mongoose.model('Album', wallSchema);
module.exports = Album;
