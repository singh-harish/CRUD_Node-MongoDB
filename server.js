// load environment variables
require('dotenv').config();

// grab dependencies
const express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  expressLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')  ;

// configure application ================================

// telling express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// connect to database
mongoose.connect(process.env.DB_URI);

// using body parser to grab info from form
app.use(bodyParser.urlencoded({extended: true}));

// set the route ========================================
app.use(require('./app/routes'));

// start our server =====================================
app.listen(port, () => {
  console.log(`APP LISTENING ON http://localhost:${port}`);
});
