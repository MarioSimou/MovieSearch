import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Card from '../Card'
import SearcBar from '../SearchBar'
import Header from '../Header'
// actions
import { requestMovies } from '../../actions' 
// style
import './style.css'


class Home extends Component {
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
    render() {
        const { movies } = this.props

        if( Object.values( movies).length > 0 ){
            return (
                <div className="home">
                    <Header />
                    <div className="searchbar-wrapper">
                        <SearcBar />
                    </div>
                    { this.renderCards( movies ) }
                </div>
            )    
        } else {
            return ( <div className="home"></div> )
        }
    }
}

const mapStateToProps = state => {
    return { movies : state.loadMovies }
}

export default connect( mapStateToProps , { requestMovies } )( Home )