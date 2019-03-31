import moviesAPI from '../config'
import * as T from './type'

const requestMovies = () => async dispatch => {
    const { data } = await moviesAPI.get('/movies')
    const movies = data.reduce( ( a , s ) => ({ ...a , [s.movie.Title]:s.movie }) , {})
    
    dispatch({
        type: T.REQUEST_MOVIES,
        payload: { movies }
    })
}

const filterMovies = value => ( dispatch, getState ) => {
    const { loadMovies } = getState() 
    const movies = {}

    // filters the global object
    for(const key in loadMovies){
        if( new RegExp(`^${ value }` , 'i' ).test( key )) {
            movies[key] = loadMovies[key]
        }
    }  

    dispatch({
        type : T.FILTER_MOVIES,
        payload : { filteredMovies : movies }
    })
}

export { requestMovies , filterMovies }