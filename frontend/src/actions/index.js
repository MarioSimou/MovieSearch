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

const isFiltering = b => ({
    type: T.IS_FILTERING,
    payload : { isFiltering : b }
})

const filterMovies = value => ( dispatch, getState ) => {
    const { loadMovies } = getState() 
    const movies = {}

    // filters the global object
    for(const key in loadMovies){
        if( new RegExp(`^${ value }` , 'i' ).test( key )) {
            movies[key] = loadMovies[key]
        }
    }  

    // dispatch the filtered object
    dispatch({
        type : T.FILTER_MOVIES,
        payload : { filteredMovies : movies }
    })
    // updates that the filtering process has stopped
    dispatch( isFiltering( false ) )

}

// This action loads the user when he/she login to the page
const loggedUser = user => ({
    type: T.STORE_LOGGED_USER,
    payload: { user }
})
// action that updates the authentication token when the user login
const updateAuthObject = auth => ({
    type : T.UPDATE_AUTH_OBJECT,
    payload: { ...auth }
})
// clears the authentication object
const flushAuthObject = () => ({
    type : T.FLUSH_AUTH,
    payload : {}
})

// action that loads a message to store
const setMessage = msg => ({
    type : T.LOAD_MESSAGE,
    payload : { msg }
})

const updateSite = site => dispatch => {
    // resets any message when the page updates
    dispatch( setMessage({ show: false, header: '', content: '', type: null }) );

    dispatch({
        type : T.UPDATE_PAGE,
        payload : site    
    })
}


export { requestMovies , filterMovies , isFiltering , loggedUser , updateAuthObject , setMessage , updateSite , flushAuthObject }