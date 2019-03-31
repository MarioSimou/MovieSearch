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
    constructor(props) {
        super(props)
        this.state = { init: true , hasTyped : false }
    }
    // loads the movies
    componentDidMount() {
        this.props.requestMovies()
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

    render() {
        const { movies, filteredObject } = this.props
        const { init , hasTyped  } = this.state
        const fn = Object.values( filteredObject ).length // size of filtered object

        switch ( init ) {
            case true:
                // initialization process
                return (
                    <div className="home">
                        <div className="ui active massive loader"></div>
                    </div>
                )
            case false:
                switch( hasTyped ){
                    case true:
                        if( fn === 0 ){
                            return (
                                <div className="home">
                                    <Header />
                                    <div className="searchbar-wrapper">
                                        <SearcBar hasTyped={ this.hasTyped } />
                                    </div>
                                    <div className="cards-wrapper">
                                        <h2 className="ui header">No movies have been found</h2>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="home">
                                    <Header />
                                    <div className="searchbar-wrapper">
                                        <SearcBar hasTyped={ this.hasTyped } />
                                    </div>
                                    {this.renderCards( filteredObject )}
                                </div>
                            ) 
                        }
                    case false:
                        return (
                            <div className="home">
                                <Header />
                                <div className="searchbar-wrapper">
                                    <SearcBar hasTyped={ this.hasTyped } />
                                </div>
                                {this.renderCards( movies )}
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
    return { movies: state.loadMovies, filteredObject: state.filterRootObject }
}

export default connect(mapStateToProps, { requestMovies })(Home)