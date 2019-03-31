const express = require('express'),
      app = express(),
      port = process.env.PORT || 3001,
      apiRoutes = require('./routes/index'),
      utilities = require('./util'),
      bodyParser = require('body-parser');

// Content-Type : application/json
app.use( bodyParser.json( ) )

// middleware
app.use( ( req , res , next ) => {
    res.setHeader('Access-Control-Allow-Origin' , '*' )
    next()
})

// Routes
app.use ( apiRoutes )
app.use( utilities.errorHandling )

app.listen( port , () => {
    // makes available the connection with postgres
    process.connection = utilities.connectPostgres()
    console.log(`The app listens on port ${ port }`)
})