const axios = require('axios')
const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')
const fileName = 'titles.csv'

// initialise a connection pool
const pool = new Pool({
    connectionString: process.env.URI_POSTGRES_REST_API_NODEJS_POSTGRESQL
})

const populatePostgresSQL = async () => {
    // callback that request a movie based on a title and store it to postgresql
    const requestAndStoreMovie = async title => {
        const movie = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY_REST_API_NODEJS_POSTGRESQL}&t=${title}`);
        const { Title } = movie.data
        await pool.query(`INSERT INTO movies( movie_title , data ) VALUES ( $1 , $2 )`, [Title, movie.data])
    }
    // catch block for any invalid request
    try {
        let movies = await new Promise(resolve => {
            fs.readFile(path.join(__dirname, 'movies', fileName), (err, data) => {
                if (!err) resolve(data)
            })
        })
        // final 100 movies
        movies = movies.toString().split('\n')

        // each movies is requested and stored to the database
        for (movie of movies) {
            if(movie) requestAndStoreMovie(movie)
        }
    } catch (e) {
        throw new Error('Final Error')
    }
}

// execution
populatePostgresSQL()