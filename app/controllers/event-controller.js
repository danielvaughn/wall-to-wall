
var ToDoEvent = require('../models/to-do-event');

var EventController = {

  createEvent: function createEvent(req, res){
    var eventObj = new ToDoEvent(req.body.event);
    return eventObj.saveAsync()
      .then(function(savedEvent){
        return res.send({
          status: 'success',
          data: {
            event: savedEvent
          }
        });
      });
  },

  getEvents: function getEvents(req, res){
    var query = req.query;


  },

  removeEvent: function removeEvent(req, res){}

};


module.exports = EventController;
