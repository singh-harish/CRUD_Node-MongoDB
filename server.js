// grab dependencies
const express= require('express'),
app= express(),
port= process.env.PORT || 8080;

// configure application


// set the route
app.use(require('./app/routes'));

// start our server
app.listen(port, () =>{
  console.log(`APP LISTENING ON http://localhost:${port}`);
});
