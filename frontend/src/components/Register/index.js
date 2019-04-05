import React, { Component } from 'react'
import { connect } from 'react-redux'
import UTIL from '../../util'
import API from '../../config'
import qs from 'qs'
// Components
import Message from '../Message'
// actions
import { loggedUser  , updateAuthObject } from '../../actions'
// styles
import './style.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false
            },
            email: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false
            },
            password: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false
            },
            confPassword: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false
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
        this.setState({ [id]: { value, hasValue, 'hasTouch': true, hasError: false } })
    }

    onSubmitForm = async e => {
        // prevents default behaviour
        e.preventDefault();

        // check if the fileds have a value
        // const errors = UTIL.isValid( this.state )
        // if( errors.length > 0 ) {
        //     // updates the state to show an errors message
        //     this.setState( errors[0] )
        //     // stops the execution
        //     return
        // }

        // POST /register http://localhost:3001/register
        // Content-Type: x-www-form-urlencoded
        const { username , email , password , confPassword } = this.state
        const { data:res } = await API.post( '/register' , qs.stringify({
             username : username.value , 
             email : email.value , 
             password : password.value , 
             confPassword  : confPassword.value 
        }) )

        // logic based on the response
        switch( res.statusCode >= 200 && res.statusCode < 400){
            case true:
                const { message , data } = res

                this.setState( { message } );        
                this.props.updateAuthObject( data )
                this.resetValues();
                break;
            default: 
                const { errors } = res
                // display errors object
                this.setState( { ...UTIL.whichHasErrors( errors , this.state ) , ...res  } );
                break;
        }
    }

    // Routines
    resetValues = () => {
        this.setState({username: {
            value: '',
            hasValue: false,
            hasTouch: false,
            hasError: false
        },
        email: {
            value: '',
            hasValue: false,
            hasTouch: false,
            hasError: false
        },
        password: {
            value: '',
            hasValue: false,
            hasTouch: false,
            hasError: false
        },
        confPassword: {
            value: '',
            hasValue: false,
            hasTouch: false,
            hasError: false
        }})
    }
    resetMessage = s => {
        this.setState({ message: { show: s, header: '', content: '', type: null } })
    }

    // returns the JSX of registration form
    getRegistrationForm = () => {
        const { username, email, password, confPassword } = this.state
        
        return (
            <div className="register-form">
                <form className="ui form" autoComplete="off" onSubmit={e => this.onSubmitForm(e)} noValidate>
                    <div className="ui huge header">Register<i className="fas fa-users"></i></div>
                    <div className={`field ${(!username.hasValue && username.hasTouch) || username.hasError ? 'error' : ''}`}>
                        <label htmlFor="username">Username:</label>
                        <input type="text"
                            name="username"
                            id="username"
                            placeholder="username"
                            onChange={e => this.onChangeInput(e)}
                            value={username.value}
                            required
                        />
                    </div>
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
                    <div className={`field ${(!confPassword.hasValue && confPassword.hasTouch) || confPassword.hasError ? 'error' : ''}`}>
                        <input type="password"
                            name="confPassword"
                            id="confPassword"
                            placeholder="password"
                            pattern=".{8,}"
                            onChange={e => this.onChangeInput(e)}
                            value={confPassword.value}
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

        // Conditional rendering based on the returned message
        if (!message.show) {
            return (
                <div className="register-wrapper">
                    {this.getRegistrationForm()}
                </div>
            )
        } else {
            return (
                <div className="register-wrapper">
                    <div className="message-wrapper">
                        <Message message={message} showMessage={this.resetMessage} />
                    </div>
                    {this.getRegistrationForm()}
                </div>)
        }

    }
}

const mapStateToProps = state => {
    return {  user : state.storeLoggedUser , auth : state.updateAuthReducer }
}

export default connect( mapStateToProps , { loggedUser , updateAuthObject })( Register )