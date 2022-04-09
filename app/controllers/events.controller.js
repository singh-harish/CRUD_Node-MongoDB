module.exports = {

  // show all Events
  showEvents: (req, res) => {
  // create dummy data
  const events = [
    {name: 'BasketBall', slug: 'basketball', description: 'Throwing into Basket'},
    {name: 'Swimming', slug: 'swimming', description: 'Phelps is the Fastest Fish'},
    {name: 'WeightLifting', slug: 'weightLifting', description: 'Lifting heavy things up'}
  ];

  // return view with dummy data
  res.render('pages/events', {events: events});
  }
};
