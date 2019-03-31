import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterMovies } from '../../actions'

import './style.css'

class SearhBar extends Component {
    constructor(props) {
        super(props)
        this.state = { value: '' , isFiltering : false }
    }

    onChangeInput = e => {
       
        const { value } = e.target
        // update state
        this.setState({ value : value })
        // filter movies
        this.props.filterMovies( value )
        // updates parent component that the user has started typing in the searchbar
        this.props.hasTyped( true )
    }

    render() {
        const { value , isFiltering } = this.state
        // console.log(isFiltering)
        if( isFiltering ){
            return (
                <div className="searchbar" style={ { gridTemplateColumns : `2.5% 97.5%` }}>
                    <div className="ui active inline small loader"></div>
                    <input type="text"
                        placeholder="Search movie..."
                        id="search"
                        value={value}
                        onChange={e => this.onChangeInput(e)}
                    />
                </div>
            )
        } else {
            return (
                <div className="searchbar" style={ { gridTemplateColumns : `100%` }} >
                    <input type="text"
                        placeholder="Search movie..."
                        id="search"
                        value={value}
                        onChange={e => this.onChangeInput(e)}
                    />
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return { filteredObject : state.filterRootObject }
}

export default connect( mapStateToProps , { filterMovies } )( SearhBar )