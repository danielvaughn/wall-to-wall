
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    config = require('../../config').getConfig();


var ToDoEventSchema = new Schema({
  owneer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  id: String,
  name: String,
  description: String,
  url: String,
  time: {
    start: Date,
    end: Date
  },
  location: {
    id: String,
    lat: Number,
    lng: Number
  },
  category: String
});


var ToDoEvent = mongoose.model('ToDoEvent', ToDoEventSchema);
module.exports = ToDoEvent;
