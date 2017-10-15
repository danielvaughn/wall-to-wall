
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Promise = require('bluebird'),
  ToDoEvent = mongoose.model('ToDoEvent');
Promise.promisifyAll(mongoose);

module.exports = function (app) {
  app.use(express.static('public'));
  app.use('/api', router);
};

// router.get('/', function (req, res, next) {
  // Article.find(function (err, articles) {
  //   if (err) return next(err);
  //   res.render('index', {
  //     title: 'Generator-Express MVC',
  //     articles: articles
  //   });
  // });
// });

router.post('/event', function(req, res, next){
  var eventObj = new ToDoEvent(req.body.event);
  return eventObj.saveAsync()
    .then(function(savedEvent){
      console.log('did save event');
      return res.send({
        status: 'success',
        data: {
          event: savedEvent
        }
      })
    });
});
