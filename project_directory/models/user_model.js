var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called gillers.
 */
var UserSchema = new Schema(
    {
        username: {
            type: String, required: true
        },
        password: {
            type: String, required: true
        },
        score: {
            type: Number, default: 0
        },
        isAdmin: {
            type: Boolean, default: false
        }
    },
    {
        collection: 'users'
    }
);

var ImageSchema = new Schema(
    {
        username: {
            type: String, required: true
        },
        imageurl: {type: String , required: true},
    },
    {
        collection: 'images'
    }
);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.connect('mongodb://localhost/usersdb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
User = mongoose.model('User', UserSchema);
Image = mongoose.model('Image', ImageSchema);

module.exports = {
    User: User,
    Image: Image
  };
