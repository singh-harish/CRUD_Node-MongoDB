const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingle: showSingle,
  seedEvents: seedEvents,
  showCreate: showCreate,
  processCreate: processCreate,
  showEdit: showEdit,
  processEdit: processEdit
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
      events: events,
      success: req.flash('success')
    });
  });
}

// show a single events
function showSingle(req, res) {
  // get a single data
  Event.findOne({
    slug: req.params.slug
  }, (err, event) => {
    if (err) {
      res.status(404);
      res.send("Events Not Found");
    }
    res.render('pages/single', {
      event: event,
      success: req.flash('success')
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

// show the create form
function showCreate(req, res) {
  res.render('pages/create', {
    errors: req.flash('errors')
  });
}

// process create form
function processCreate(req, res) {
  // validate information
  req.checkBody('name', 'Name is Required').notEmpty();
  req.checkBody('description', 'Description is Required').notEmpty();

  // if errors, redirect and save error to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/events/create');
  }

  // create a new event
  const event = new Event({
    name: req.body.name,
    description: req.body.description
  });

  // save event
  event.save((err) => {
    if (err) throw err;

    // set a success flash message
    req.flash('success', 'Successfully created Event.');

    // redirect to newly created event
    res.redirect(`/events/${event.slug}`);
  });
}


// show edit form
function showEdit(req, res) {
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    res.render('pages/edit', {
      event: event,
      errors: req.flash('errors')
    });
  });
}

// process edit form
function processEdit(req, res) {
  // validate information
  req.checkBody('name', 'Name is Required').notEmpty();
  req.checkBody('description', 'Description is Required').notEmpty();

  // if errors, redirect and save error to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/events/${req.params.slug}/edit`);
  }

  // find a current eventS
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    // update event
    event.name = req.body.name;
    event.description = req.body.description;

    event.save((err) => {
      if(err)
        throw err;

      // success flash messsage
      req.flash('success', 'Successfully updated Event.');
      // redirect back to /events
      res.redirect('/events');
    });
  });

}
