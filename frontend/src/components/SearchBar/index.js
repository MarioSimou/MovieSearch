import React, { Component } from 'react'

import './style.css'

class SearhBar extends Component {
    constructor(props) {
        super(props)
        this.state = { value: '' , isFiltering : false }
    }

    onChangeInput = e => {
        this.setState({ value , isFiltering : true })

        const { value } = e.target
        // update filtered object
        this.props.filterMovies(value )
        this.setState({ value , isFiltering : false })
    }

    render() {
        const { value , isFiltering } = this.state
        console.log(isFiltering)
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


export default SearhBar