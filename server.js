// grab dependencies
const express= require('express'),
app= express(),
port= process.env.PORT || 8080,
expressLayouts= require('express-ejs-layouts');

// configure application

// telling express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts); 

// set the route
app.use(require('./app/routes'));

// start our server
app.listen(port, () =>{
  console.log(`APP LISTENING ON http://localhost:${port}`);
});
