const Router = require('express-promise-router'),
      router = new Router(),
      { hasValue } = require('../util/index'),
      { HttpError } = require('../models/Error'),
      { createMessage } = require('../util/index'),
      { validationResult }  = require('express-validator/check'),
      { compare , hash } = require('bcryptjs'),
      { validateRegistration , validateLogin } = require('../middlewares/validation'),
      jwt = require('jsonwebtoken');

// Redirection link to /movies
router.get('/' , ( req , res , next ) => {
    res.redirect( 301 , '/movies')
} )

// GET /movies 
router.get('/movies', async (req, res , next ) => {
    try {
        const { connection } = process
        // movies in the database
        const { rows } = await connection.query({ text : 'SELECT data as movie FROM movies'  })
        // response
        if( hasValue( rows )) {
            res.status( 200 ).json( rows )
        }
        else throw new HttpError('Undefined record')
    } catch( e ) {
        // updates the error object with a status code
        return next( e )
    }
})

// GET /movies/title/:title
router.get('/movies/title/:title' , async ( req ,res ,next ) => {
    try{
        const { connection } = process
        const { title } = req.params
        const { rows } = await connection.query( `SELECT data as movie FROM movies WHERE data->>'Title' ~* $1`, [ title ] )
        
        if( hasValue( rows )) res.status( 200 ).json( rows )
        else throw new HttpError( 'Undefined record' )
        
    }catch( e ){
        return next( e )
    }
})

// GET /movies/actor/:actor
router.get('/movies/actor/:actor' , async ( req ,res ,next ) => {
    try{
        const { connection } = process
        const { actor } = req.params
        const r = await connection.query( `SELECT data as movie FROM movies WHERE data->>'Actors' ~* $1` , [ actor ] )
       
        if( hasValue( r.rows )) res.status( 200 ).json( r.rows )
        else throw new HttpError('Undefined record')
        
    }catch( e ){
        return next( e )
    }
})

// POST /login
router.post('/login' , validateLogin , async ( req , res , next ) => {
    let message;
    const errors = validationResult( req )

        if( errors.isEmpty() ){
            const { id , email  } = req.user
            delete req.user
            
            // set JWT token
            const token = jwt.sign( { id, email } ,  process.env.API_JWT_SECRET , { expiresIn : Date.now() + 3600000 })
            
            // creates message that will be returned
            message = createMessage( 'Successful Registration' , 'Welcome to our site' , 'positive')
            
            // response
            res.send({ statusCode : 200 , ...message , data : { token , email , id } , errors : null })    
        } else {
            const e = errors.array()
            const message = createMessage('Unsuccessful registration' , e[0].msg  , 'negative')
            res.send({ statusCode : 400 , ...message , errors : e })
        }
})

// POST /register
router.post('/register' ,  validateRegistration ,  async ( req , res , next ) => {
    let message;
    const errors = validationResult( req )

        if( errors.isEmpty() ){
            const { connection } = process
            const { username , email , password } = req.body

            // password hashing
            const hashedPassword = await hash( password , 12 ) 
            // store user to db
            await connection.query('INSERT INTO users( username , email , password) VALUES( $1 , $2 , $3 )' , [ username , email ,hashedPassword ])
            const { rows } = await connection.query('SELECT id, email FROM users WHERE email=$1' , [ email ])
            // creates message that will be returned
            message = createMessage( 'Successful Registration' , 'Welcome to our site' , 'positive')
            // a jwt token is signed and returned
            const token = jwt.sign( { ...rows[0] } , process.env.API_JWT_SECRET , {  expiresIn : Date.now() + 3600000 } )

            // response
            res.send({ statusCode : 200 , ...message  , data : { token , ...rows[0] } , errors : null })    
        } else {
            const e = errors.array()
            const message = createMessage('Unsuccessful registration' , e[0].msg  , 'negative')
            res.send({ statusCode : 400 , ...message , errors : e })
        }
})

// POST /movies/add
router.post('/movies/add' , async ( req , res ) => {
    const { authorization } = req.headers
    let message;

    if( authorization ){
        // extracts the authorization token
        const token = authorization.replace( /Bearer\s+/ , '')
        try {
            const decoded = jwt.verify( token , process.env.API_JWT_SECRET )
            if ( decoded ){
                const { connection } = process
                const { title , type , released , runtime , genre , actors , imdb ,rottenTomatoes , metacritic, poster , plot } = req.body
                const data = JSON.stringify({ 
                    'Title' : title,
                    'Type' : type,
                    'Released' : released,
                    'Runtime' : `${runtime} min`,
                    'Genre' : genre,
                    'Actors': actors,
                    'Plot': plot,
                    'Poster': poster,
                    'Ratings' : [ { 'Value' : `${ imdb }/10` , 'Source' : 'Internet Movie Database'} , 
                                  { 'Value' : `${ rottenTomatoes }/100` , 'Source' : 'Rotten Tomatoes'},
                                  { 'Value' : `${metacritic}/100` , 'Source' : 'Metacritic'}
                                ]

                })       
                // updates the database
                await connection.query('INSERT INTO movies( movie_title , data ) VALUES ( $1 , $2 )' , [ title , data ])
                
                // creates message that will be returned
                message = createMessage( 'Successful Registration' , 'Movie has been successfully submitted' , 'positive')
                // response
                res.send({ statusCode : 200 , ...message }) 
            }
        } catch ( e ){
            message = createMessage('Unsuccessful registration' , e.message  , 'negative')
            res.send({ statusCode : 400 , ...message })
        }
    } else {
        message = createMessage('Unsuccessful registration' , 'Unauthorized user'  , 'negative')
        res.send({ statusCode : 401 , ...message })
    }
})

module.exports = router; 