import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UTIL from '../../util'
// actions
import { updateSite , flushAuthObject } from '../../actions'
// style
import './style.css'

class Navbar extends Component {
    onClickLink = e => {
        this.props.updateSite( UTIL.getPathname( e.target.href ) )
    }
    onClickLogOut = e => {
        window.location.href = '/'
    }

    decideAuthBtns = ( { token }) => {
        if ( !token ){
            return(
                <div className="right menu">
                    <Link to="/login"
                            className="item"
                            onClick={ e => this.onClickLink( e ) }
                        >
                            Login
                    </Link>
                    <Link to="/register"
                            className="item"
                            onClick={ e => this.onClickLink( e ) }
                        >
                            Register
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="right menu">
                    <Link to="#"
                          className="item"
                          onClick={ e => { this.onClickLogOut( e ) } }
                    >
                        Logout
                    </Link>
                </div>
            )
        }
    }

    render(){
        const { auth } = this.props
        return (
            <div className="ui teal medium stackable menu">
                <Link to="/"
                      className="item"
                      onClick={ e => this.onClickLink( e ) }
                >
                    <i className="film icon"></i>
                </Link>
                <Link to="/"
                    className="item"
                    onClick={ e => this.onClickLink( e ) }
                >
                    <i className="home icon"></i>Home
                </Link>
                <Link to="/movies/add"
                    className="item"
                    onClick={ e => this.onClickLink( e ) }
                >
                    <i className="plus icon"></i> Add Movie                    
                </Link>
                { this.decideAuthBtns( auth || {} ) }
            </div>
        )
    }
}

const mapStateToProps  = state => {
    return { site : state.updatePageReducer , auth : state.updateAuthReducer  }
}
export default connect( mapStateToProps , { updateSite , flushAuthObject })( Navbar )