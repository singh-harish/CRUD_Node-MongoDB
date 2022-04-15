// create new Express Router
const express = require('express'),
  router = express.Router(),
  mainController = require('./controllers/main.controller'),
  eventsController = require('./controllers/events.controller');

// export Router
module.exports = router;

// define routes
// main routes
router.get('/', mainController.showHome);

// events routes
router.get('/events', eventsController.showEvents);

// seed events
router.get('/events/seed', eventsController.seedEvents);

// create eventS
router.get('/events/create', eventsController.showCreate);
router.post('/events/create', eventsController.processCreate);

// edit eventS
router.get('/events/:slug/edit', eventsController.showEdit);
router.post('/events/:slug', eventsController.processEdit); 

// delete eventS

// show single eventS
router.get('/events/:slug', eventsController.showSingle);
