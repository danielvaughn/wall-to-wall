
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ToDoEventSchema = new Schema({
  id: String,
  name: String,
  url: String,
  description: String,
  time: {
    start: Date,
    end: Date
  },
  location: {
    id: String,
    lat: String,
    lng: String
  }
});


var ToDoEvent = mongoose.model('ToDoEvent', ToDoEventSchema);
module.exports = ToDoEvent;
