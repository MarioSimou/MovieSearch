import { combineReducers } from 'redux'
import * as T from '../actions/type'

const loadMovies = ( movies = {} , action ) => {
    switch( action.type ){
        case T.REQUEST_MOVIES :
            return { ...movies, ...action.payload.movies }
        default : 
            return movies
    }
}

const filterRootObject = ( movies = {} , action ) => {
    switch( action.type ){
        case T.FILTER_MOVIES:
            return { ...action.payload.filteredMovies } 
        default :
            return movies
    }
}

export default combineReducers({ loadMovies ,  filterRootObject })