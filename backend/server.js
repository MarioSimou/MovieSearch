const express = require('express'),
      app = express(),
      port = process.env.PORT || 3001,
      apiRoutes = require('./routes/index'),
      utilities = require('./util'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      RedisStore = require('connect-redis')( session ),
      crypto = require('crypto')

// allow cookie parsing functionality
app.use( cookieParser() )

// Content-Type : x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended : true })) // extended : true -> qs
// Content-Type : application/json
app.use( bodyParser.json( ) )

// embed session storage functionality
app.use( session({
    cookie : { maxAge : 3600 * 1000 , secure : false , httpOnly : true , path : '/'   },
    saveUninitialized : false,
    resave : false , 
    store : new RedisStore({ url : process.env.UIR_REDIS_API_NODEJS_POSTGRESQL }),
    secret: process.env.SESSION_SEC || crypto.randomBytes(30).toString('hex'),
})) 

// middleware
app.use( ( req , res , next ) => {
    res.setHeader('Access-Control-Allow-Origin' , '*' )
    res.setHeader('Access-Control-Allow-Methods' , 'GET,POST' )
    res.setHeader('Access-Control-Allow-Headers' , 'Authorization')
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