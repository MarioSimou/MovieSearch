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

export { requestMovies }