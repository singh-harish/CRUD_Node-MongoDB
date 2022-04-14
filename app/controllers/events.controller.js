const Event = require('../models/event');

module.exports = {

  // show all Events
  showEvents: (req, res) => {

    // return view with dummy data
    res.render('pages/events', {
      events: events
    });
  },

  // show a single events
  showSingle: (req, res) => {
    // get a single data
    const event = {
      name: 'BasketBall',
      slug: 'basketball',
      description: 'Throwing into Basket'
    };

    res.render('pages/single', {
      event: event
    });
  },

  // seed our database
  seedEvents: (req, res) => {
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
};
