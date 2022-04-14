const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingle: showSingle,
  seedEvents: seedEvents
}


// show all Events
function showEvents(req, res) {
  // get all eventS
  Event.find({}, (err, events) => {
    if (err) {
      res.status(404);
      res.send("Events Not Found");
    }
    res.render('pages/events', {
      events: events
    });
  });
}

// show a single events
function showSingle(req, res) {
  // get a single data
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    if (err) {
      res.status(404);
      res.send("Events Not Found");
    }
    res.render('pages/single', {
      event: event
    });
  });
}

// seed our database
function seedEvents(req, res) {
  // create some eventS
  const events = [{
      name: 'BasketBall',
      description: 'Throwing into Basket'
    },
    {
      name: 'Swimming',
      description: 'Phelps is the Fastest Fish'
    },
    {
      name: 'WeightLifting',
      description: 'Lifting heavy things up'
    },
    {
      name: 'Ping-Pong',
      description: 'Super fast paddles'
    }
  ];

  // use the event model to insert/save
  // removes all entries and inserts all again from scratch
  Event.deleteMany({}, () => {
    for (event of events) {
      var newEvent = new Event(event);
      newEvent.save();
    }
  });

  // seeded msg
  res.send('Database Seeded');
}
