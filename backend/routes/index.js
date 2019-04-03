const Router = require('express-promise-router'),
      router = new Router(),
      { hasValue } = require('../util/index'),
      { HttpError } = require('../models/Error'),
      crypto = require('crypto');

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
            req.session.user = { 'sid' : crypto.pseudoRandomBytes( 30 ).toString( 'hex') }
            console.log(res.get('set-cookie'))
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


module.exports = router; 