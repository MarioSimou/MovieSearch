import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Card from '../Card'
import SearcBar from '../SearchBar'
import Header from '../Header'
import Message from '../Message'
// actions
import { requestMovies , updateAuthObject  } from '../../actions'

// style
import './style.css'


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { init: true , hasTyped : false }
    }
    // loads the movies
    componentDidMount() {
        // request movies 
        this.props.requestMovies()

        try{
            // json object
            const d = JSON.parse( window.localStorage.getItem('moviesearch.data') )
            // if the json token has not expired
            if ( d && new Date(JSON.parse(atob( d.token.split('.')[1])).exp) > Date.now() ){
                // set the authenticaiton object
                this.props.updateAuthObject( d  )
            }
        }catch(e ){
            console.log(e.message)
        }

    }
    // renders the cards of movies
    renderCards = movies => {
        return (
            <div className="cards-wrapper">
                {Object.values(movies).slice(0, 50).map((v, i) => {
                    return (
                        <Card key={i} movie={v} />
                    )
                })
                }
            </div>
        )
    }
    // lifecycle event
    componentDidUpdate(prevProps, prevState) {
        const fn = Object.values(this.props.filteredObject).length,
            pn = Object.values(prevProps.filteredObject).length,
            mn = Object.values(this.props.movies).length

        // is the component is initialized but the movies values have been fetched,
        // then it changes the init state
        if (this.state.init && mn > 0) {
            this.setState({ init: false })
        }
        // check between the size of the filtered object before and after a search
        if (fn !== pn) {
            this.setState({ })
        }
    }
    // callback function that updated the state of Home component when the user starts typing. If the state has laready been executed,
    // it just skips it
    hasTyped = v => {
        const { hasTyped } = this.state
        // checks whether the v is true and the hasTyped state is false
        if( !hasTyped && v ){
            this.setState({ hasTyped : v })
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
        const { movies, filteredObject , message } = this.props
        const { init , hasTyped  } = this.state
        const fn = Object.values( filteredObject ).length // size of filtered object

        switch ( init ) {
            case true:
                // initialization process
                return (
                    <div className="home-site">
                        <div className="ui active massive loader"></div>
                    </div>
                )
            case false:
                switch( hasTyped ){
                    case true:
                        if( fn === 0 ){
                            return (
                                <div className="wrapper">
                                    { this.loadMessageIfExist( message ) }
                                    <div className="home-site">
                                        <Header />
                                        <div className="searchbar-wrapper">
                                            <SearcBar hasTyped={ this.hasTyped } />
                                        </div>
                                        <div className="cards-wrapper">
                                            <h2 className="ui header">No movies have been found</h2>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="wrapper">
                                    { this.loadMessageIfExist( message ) }
                                    <div className="home-site">
                                        <Header />
                                        <div className="searchbar-wrapper">
                                            <SearcBar hasTyped={ this.hasTyped } />
                                        </div>
                                        {this.renderCards( filteredObject )}
                                    </div>
                                </div>
                            ) 
                        }
                    case false:
                        return (
                            <div className="wrapper">
                                { this.loadMessageIfExist( message ) }
                                <div className="home-site">
                                    <Header />
                                    <div className="searchbar-wrapper">
                                        <SearcBar hasTyped={ this.hasTyped } />
                                    </div>
                                    {this.renderCards( movies )}
                                </div>
                            </div>
                        )
                    default:
                            return(
                                <div></div>
                            )
                }
            default:
                break;
        }
    }
}

const mapStateToProps = state => {
    return { movies: state.loadMovies, filteredObject: state.filterRootObject , message : state.setMessageReducer.msg || state.setMessageReducer  }
}

export default connect(mapStateToProps, { requestMovies , updateAuthObject })(Home)