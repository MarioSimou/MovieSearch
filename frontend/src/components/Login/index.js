import React, { Component } from 'react'
import { connect } from 'react-redux'
import UTIL from '../../util'
import API from '../../config'
import qs from 'qs'
// Components
import Message from '../Message'
// actions
import { loggedUser } from '../../actions' 
// styles
import './style.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false,
            },
            password: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false,
            },
            message: {
                show: false,
                content: '',
                header: '',
                type: null
            }
        }
    }

    // Events Callbacks
    onChangeInput = e => {
        const { id, value } = e.target
        const hasValue = UTIL.hasValue(value)
        this.setState({ [id]: { value, hasValue, 'hasTouch': true , 'hasError' : false } })
    }

    onSubmitForm = async e => {
        // prevents default behaviour
        e.preventDefault();

        /*  
            Future Step: 
            POST /login http://localhost:3001
            Content-Type: x-www-form-urlencoded
        */
        const { email , password } = this.state
        const { data:res } = await API.post( '/login' , qs.stringify({
             email : email.value , 
             password : password.value , 
        }) )

        // logic based on the response
        switch( res.statusCode >= 0 && res.statusCode < 400){
            case true:
                this.setState( { ...res } );
                this.resetValues();
                break;
            default: 
                // display errors object
                this.setState( { ...UTIL.whichHasErrors( res.errors , this.state ) , ...res  } );
                break;
        }
    }
    // Routines
    resetValues = () => {
        this.setState({
            email: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false,
            },
            password: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false,
            }
        })
    }
    resetMessage = s => {
        this.setState( {message : { show : s , header : '' , content : '' , type : null } })
    }

    // returns the registration form JSX
    getRegistrationForm = () => {
        const { email, password } = this.state
       
        return (
            <div className="login-form">
                <form className="ui form" autoComplete="off" onSubmit={e => this.onSubmitForm(e)} noValidate>
                    <div className="ui huge header">Login<i className="fas fa-users"></i></div>
                    <div className={`field ${(!email.hasValue && email.hasTouch) || email.hasError ? 'error' : ''}`}>
                        <label htmlFor="email">Email Address:</label>
                        <input type="email"
                            name="email"
                            id="email"
                            placeholder="email address"
                            onChange={e => this.onChangeInput(e)}
                            value={email.value}
                            required
                        />
                    </div>
                    <div className={`field ${(!password.hasValue && password.hasTouch) || password.hasError ? 'error' : ''}`}>
                        <label htmlFor="password">Password:</label>
                        <input type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            pattern=".{8,}"
                            onChange={e => this.onChangeInput(e)}
                            value={password.value}
                            required
                        />
                    </div>
                    <div className="field">
                        <button className="ui fluid teal button" type="submit" >Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        const { message } = this.state
        if (!message.show) {
            return (
                <div className="login-wrapper">
                    {this.getRegistrationForm()}
                </div>
            )
        } else {
            return (
                <div className="login-wrapper">
                    <div className="message-wrapper">
                        <Message message={message} showMessage={ this.resetMessage } />
                    </div>
                    {this.getRegistrationForm()}
                </div>)
        }
    }
}

const mapStateToProps = state => {
    return { user : state.storeLoggedUser }
}

export default connect( mapStateToProps , { loggedUser } )( Login )