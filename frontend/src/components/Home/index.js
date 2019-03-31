import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Card from '../Card'
import SearcBar from '../SearchBar'
import Header from '../Header'
// actions
import { filterMovies , requestMovies } from '../../actions' 

// style
import './style.css'
import { constants } from 'crypto';


class Home extends Component {
    constructor( props ){
        super( props )
        this.state = { init : true }
    }
    // loads the movies
    componentDidMount(){
        this.props.requestMovies()
    }
    // renders the cards of movies
    renderCards = movies => {
        return (
            <div className="cards-wrapper">
                { Object.values( movies ).slice( 0 , 50 ).map( (v , i) => {
                return (
                        <Card key={ i } movie={ v } />
                        )
                    })
                }
            </div>
        )
    }
    // filtering method of the root object
    filterMovies = value => {
        // updates the init state
        const { init } = this.state
        if( init ) this.setState({ init : false})
        // filter movies
        this.props.filterMovies( value )
    }
    render() {
        const { movies , filteredObject } = this.props
        const { init  } = this.state 
        
        if( Object.values( movies).length > 0 ){
            return (
                <div className="home">
                    <Header />
                    <div className="searchbar-wrapper">
                        <SearcBar filterMovies={ this.filterMovies } />
                    </div>
                    { this.renderCards( init ? movies : filteredObject ) }
                </div>
            )    
        } else  {
            return ( 
                <div className="home">
                    <div className="ui active massive loader"></div>
                </div> 
            )
        }
    }
}

const mapStateToProps = state => {
    return { movies : state.loadMovies , filteredObject : state.filterRootObject }
}

export default connect( mapStateToProps , { requestMovies , filterMovies } )( Home )