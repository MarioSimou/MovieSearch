import React, { Component } from 'react'

import './style.css'

class SearhBar extends Component {
    render() {
        return (
            <div className="searchbar">
                <i className="spinner icon" />
                <input type="text" placeholder="Search movie..." id="search" />
            </div>
        )
    }
}

export default SearhBar