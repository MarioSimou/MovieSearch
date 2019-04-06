import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import AccordionSub from '../AccordionSub'

// style
import './style.css'

class MovieDetails extends Component {
    constructor(  props ){
        super( props )
        this.state = { isEnabledAccordion : false }
    }

    // onmousemove callback
    onMouseOverAccordion = e => {
        if( window.jQuery ){
            const { isEnabledAccordion } = this.state
            if ( !isEnabledAccordion ){
                // activates accordion 
                window.jQuery('.ui.accordion').accordion();
                // disable accordion state
                this.setState({ isEnabledAccordion : true } )
            }
        }
    }

    parseGenre = ( genre , sep ) => {
        if( !genre) return (<div></div>)

        return genre.split(',').map( ( v , i ) => {
            return (
                <div className="ui label" key={ i } >
                    { v }
                </div>
            )
        })
    }

    render() {
        const { title } = this.props.match.params
        const { [title]:movie } = this.props.movies

        if( movie ){
            const { Title, Actors , Ratings , Runtime , Type, Genre,  Plot ,  Released, Poster } = movie
            
    
            return (
                <div className="movie-details">
                    <div className="details">
                        <h1 className="ui dividing header">
                            <i className="film icon"></i>
                            Details
                        </h1>
                        <div className="ui items">
                            <div className="item">
                                <div className="ui image" >
                                    <img alt="movie" src={ Poster } />
                                </div>
                                <div className="content">
                                    <div className="header">
                                        <h2 className="ui header">{ Title } </h2>
                                    </div>
                                    <div className="meta">
                                        <span className="cinema">{ Released } </span>
                                    </div>
                                    <div className="description">
                                        <div className="ui accordion" onMouseOver={ e => this.onMouseOverAccordion( e ) } >
                                            <AccordionSub isActive="true" header="What is the plot?" content={ Plot } />
                                            <AccordionSub header="Who were the actors?" content={ Actors } />
                                            <AccordionSub header="How long the movie it takes?" content={ Runtime } />
                                            <AccordionSub header="What was the rating?" content={  Ratings } />
                                        </div>
                                    </div>
                                    <div className="extra">
                                        <div className="ui label">{ Type }</div>
                                        { this.parseGenre( Genre , ',') }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else  return ( <div> </div>)
    }
}

const mapStateToProps = state => {
    return { movies: state.loadMovies }
}

export default connect(mapStateToProps, {})(MovieDetails)