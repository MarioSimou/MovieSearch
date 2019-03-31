import React , { Component } from 'react'
import { Link } from 'react-router-dom'

// style
import './style.css'

class Navbar extends Component {
    render(){
        return (
            <div className="ui teal medium stackable menu">
                <Link to="/"
                      className="item"
                >
                    <i className="film icon"></i>
                </Link>
                <Link to="/"
                    className="item"
                >
                    Home
                </Link>
                <Link to="/contact"
                    className="item"
                >
                    Contact                    
                </Link>
                <div className="right menu">
                    {/* <div className="ui left icon transparent input">
                        <i className="search icon"></i>
                        <input type="text" placeholder="search" />
                    </div> */}
                    <Link to="/login"
                          className="item"
                    >
                        Login
                    </Link>
                    <Link to="/register"
                          className="item"
                    >
                        Register
                    </Link>
                </div>

            </div>
        )
    }
}

export default Navbar