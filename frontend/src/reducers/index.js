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

const isFilteringReducer = ( state = false , action ) => {
    switch( action.type ){
        case T.IS_FILTERING:
            return action.payload.isFiltering
        default:
            return state
    }
}

const updateAuthReducer = ( state = {}  , action ) => {
    switch( action.type ){
        case T.UPDATE_AUTH_OBJECT:
            return { ...state , ...action.payload }
        case T.FLUSH_AUTH:
            return {}
        default:
            return  state
    }
}

const setMessageReducer = ( state = {} , action ) => {
    switch( action.type ){
        case T.LOAD_MESSAGE :
            return { ...state , ...action.payload }
        default:
            return state
    }
}

const updatePageReducer = ( page = '/' , action ) => {
    switch( action.type ){
        case T.UPDATE_PAGE:
            return action.payload
        default:
            return page
    }
}

export default combineReducers({ loadMovies ,  filterRootObject , isFilteringReducer , updateAuthReducer , setMessageReducer , updatePageReducer })