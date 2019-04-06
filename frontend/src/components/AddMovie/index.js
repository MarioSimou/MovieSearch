import React, { Component } from 'react'
import API from '../../config'
import UTIL from '../../util'
import { connect } from 'react-redux'
import qs from 'qs'
// actions
import { setMessage , updateSite } from '../../actions'
// componets
import Message from '../Message'
// style
import './style.css'

class AddMovie extends Component {
    constructor( props ){
        super( props )
        this.title = React.createRef()
        this.type = React.createRef()
        this.released = React.createRef()
        this.runtime = React.createRef()
        this.genre = React.createRef()
        this.actors = React.createRef()
        this.imdb = React.createRef()
        this.rottenTomatoes =React.createRef()
        this.metacritic = React.createRef()
        this.poster = React.createRef()
        this.plot = React.createRef()
    }

    componentDidMount() {
        // initial jquery setup
        if (window.jQuery)
            window.jQuery('.ui.dropdown').dropdown();
    }

    onFormSubmit = async ( e ) => {
        const { title , type , released , runtime , genre , actors , imdb ,rottenTomatoes , metacritic, poster , plot } = this
        const { auth } = this.props
        // prevents default functionality
        e.preventDefault();
        // routine that gets the values from the fields and checks them if they have a value
        const check = UTIL.extractTagValues( title.current , type.current , released.current , runtime.current , genre.current , actors.current , imdb.current ,                                                  rottenTomatoes.current , metacritic.current , poster.current , plot.current )
        console.log('AUTH:' , auth )
        // if the user is authenticated
        switch( auth && ( auth.token ? true : false ) ){
            case true:
                // if the user has filled all the values
                switch( check.every( v =>  v ? true : false )){
                    case true: 
                        // proceed with sendings the data
                        const fields = ['title' , 'type' , 'released' , 'runtime' , 'genre' , 'actors' , 'imdb' ,
                                        'rottenTomatoes' , 'metacritic', 'poster' , 'plot' ]
                                        .reduce( (a , c , i) => ({ ...a , [c]:check[i]}), {});
                        const { data : { message , statusCode } } = await API.post('/movies/add' , 
                                                                                    qs.stringify( fields ) , 
                                                                                    { headers : { 'Authorization' : `Bearer ${ auth.token }`} })
                        switch( statusCode >= 200 && statusCode < 400 ){
                            case true:
                                // redirects to / page
                                this.props.updateSite('/')
                                // sets message
                                this.props.setMessage( message )
                                // redirection
                                this.props.history.push('/')
                                break;
                            default:
                                this.props.setMessage( message )
                                break;
                        }
                        break;
                    default:
                        // show error message
                        this.props.setMessage( UTIL.createErrorMessage('Unsuccessful Submition' , 'Fill all the values to continue' ))
                        break;
                }
                break;
            default:
                this.props.setMessage( UTIL.createErrorMessage('Unauthenticated User' , 'A user should be logged in to submit the form' ))
                break;
        }
    }

    loadMessageIfExist = ( message ) => {
        if( message.show ){
            return (
                <div className="message-wrapper">
                    <Message msg={message} />
                </div>
            )
        } else return ( <div></div>)
    }

    render() {
        const { message } = this.props
        return (
            <div className="add-movie-wrapper">
                { this.loadMessageIfExist( message ) }
                <div className="add-movie">
                    <form onSubmit={e => this.onFormSubmit( e ) }
                        id="add-movie-form"
                    >
                        <div className="ui huge header">Add Movie</div>
                        <div className="ui form">
                            <div className="two fields">
                                <div className="field">
                                    <label htmlFor="Title">Title:</label>
                                    <input type="text"
                                        id="title"
                                        name="title"
                                        ref={ this.title }
                                        placeholder="title" />
                                </div>
                                <div className="field">
                                    <label htmlFor="type">Type:</label>
                                    <select id="type" 
                                            name="type" 
                                            ref={ this.type }
                                            className="ui dropdown">
                                        <option value="movie">Movie</option>
                                        <option value="series">Series</option>
                                    </select>
                                </div>
                            </div>
                            <div className="two fields">
                                <div className="field">
                                    <label htmlFor="released">Released:</label>
                                    <input type="text" 
                                           placeholder="e.g 08 Nov 2013" 
                                           ref={ this.released }
                                           id="released" 
                                           name="released" />
                                </div>
                                <div className="field">
                                    <label htmlFor="runtime">Runtime:</label>
                                    <input type="number" 
                                           ref={ this.runtime }
                                           id="runtime" 
                                           name="released" 
                                           defaultValue="90" />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="genre">Genre:</label>
                                <select name="genre" 
                                        id="genre" 
                                        ref={ this.genre }
                                        className="ui dropdown" 
                                        multiple="multiple">
                                    <option value="action" >Action</option>
                                    <option value="crime" >Crime</option>
                                    <option value="mystery">Mystery</option>
                                    <option value="thriller">Thriller</option>
                                    <option value="drama">Drama</option>
                                    <option value="comedy">Comedy</option>
                                    <option value="family">Family</option>
                                    <option value="romance">Romance</option>
                                    <option value="war">War</option>
                                    <option value="horror">Horror</option>
                                    <option value="western">Western</option>
                                    <option value="fantasy">Fantasy</option>
                                    <option value="sport">Sport</option>
                                    <option value="short">Short</option>
                                </select>
                            </div>
                            <div className="two fields">
                                <div className="field">
                                    <label htmlFor="actors">Actors:</label>
                                    <input type="text" 
                                           ref={ this.actors }
                                           placeholder="e.g Chiwetel Ejiofor, Dwight Henry, Dickie Gravois, Bryan Batt" 
                                           id="actors" 
                                           name="actors" />
                                </div>
                                <div className="field">
                                    <label htmlFor="ratings">Ratings</label>
                                    <ul id="ratings">
                                        <ul className="two fields" >
                                            <li>Internet Movie Database:</li>
                                            <li><input type="number" id="imdb" ref={ this.imdb } /></li>
                                        </ul>
                                        <ul className="two fields">
                                            <li>Rotten Tomatoes:</li>
                                            <li><input type="number" id="rottenTomatoes" ref={ this.rottenTomatoes } /></li>
                                        </ul>
                                        <ul className="two fields">
                                            <li>Metacritic:</li>
                                            <li><input type="number" id="metacritic" ref={ this.metacritic } /></li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="poster">Poster:</label>
                                <input type="text" 
                                       placeholder="e.g http://domain/posterpath" 
                                       ref={ this.poster }
                                       id="poster" 
                                       name="poster" />
                            </div>
                            <div className="field">
                                <label htmlFor="plot">Plot</label>
                                <textarea id="plot"
                                    ref={ this.plot }
                                    name="plot"
                                    placeholder="Describe the plot of the movie with less than 300 words..."
                                    maxLength="300"
                                >
                                </textarea>
                            </div>
                            <div className="field">
                                <input type="submit" 
                                       className="ui right floated teal large button"
                                       onClick={ e => this.onFormSubmit ( e )}
                                ></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {  message : state.setMessageReducer.msg || state.setMessageReducer , auth : state.updateAuthReducer  }
}

export default connect( mapStateToProps , { setMessage , updateSite })( AddMovie )