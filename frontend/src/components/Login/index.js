import React, { Component } from 'react'
import { connect } from 'react-redux'
import UTIL from '../../util'
import API from '../../config'
import qs from 'qs'
// Components
import Message from '../Message'
// actions
import { loggedUser , updateAuthObject , setMessage , updateSite } from '../../actions' 
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
        const { data: {  statusCode , message , data , errors } } = await API.post( '/login' , qs.stringify({
             email : email.value , 
             password : password.value , 
        }) )

        // logic based on the response
        switch( statusCode >= 200 && statusCode < 400){
            case true:
                // redirects to / page
                this.props.updateSite('/')
                // sets message
                this.props.setMessage( message )
                // set authentication object
                this.props.updateAuthObject( data )
                window.localStorage.setItem('moviesearch.data' , JSON.stringify( data ))
                // redirection
                this.props.history.push('/')
                break;
            default: 
                this.props.setMessage( message );
                this.setState( { ...UTIL.whichHasErrors( errors , this.state ) , ...message  } );
                break;
        }
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
        const { message } = this.props
        
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
                        <Message msg={message} />
                    </div>
                    {this.getRegistrationForm()}
                </div>)
        }
    }
}

const mapStateToProps = state => {
    return { user : state.storeLoggedUser , auth : state.updateAuthReducer , message : state.setMessageReducer.msg || state.setMessageReducer }
}

export default connect( mapStateToProps , { loggedUser , updateAuthObject , setMessage , updateSite } )( Login )