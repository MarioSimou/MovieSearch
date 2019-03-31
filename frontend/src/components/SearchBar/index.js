import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterMovies , isFiltering } from '../../actions'

import './style.css'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = { value: '' }
        this.searchRef = React.createRef()
    }

    componentDidUpdate( prevProps , prevState ){
        const { current } = this.searchRef
        // focus to searchbar
        if ( current ) current.focus()
        
    } 

    // callback event that is triggered when a user types in the input tag
    onChangeInput = e => {  
        const { value } = e.target
        // update state
        this.setState({ value : value  })
        this.props.isFiltering( true )
        // filter movies
        this.props.filterMovies( value )
        // updates parent component that the user has started typing in the searchbar
        this.props.hasTyped( true )
    }

    render() {
        const { value  } = this.state
        const { hasFilter } = this.props
        
        // if the component filters the results, then it displays a loader
        switch( hasFilter ){
            case true:
                return (
                    <div className="searchbar" style={ { gridTemplateColumns : `2.5% 97.5%` }}>
                        <div className="ui active inline small loader"></div>
                        <input type="text"
                            placeholder="Search movie..."
                            id="search"
                            value={value}
                            onChange={e => this.onChangeInput(e)}
                            ref={ this.searchRef }
                        />
                    </div>
                )
            default:
                return (
                    <div className="searchbar" style={ { gridTemplateColumns : `100%` }} >
                        <input type="text"
                            placeholder="Search movie..."
                            id="search"
                            value={value}
                            onChange={e => this.onChangeInput(e)}
                            ref={ this.searchRef }
                        />
                    </div>
                )
        }
    }
}

const mapStateToProps = state => {
    return { filteredObject : state.filterRootObject , hasFilter : state.isFilteringReducer }
}

export default connect( mapStateToProps , { filterMovies , isFiltering } )( SearchBar )