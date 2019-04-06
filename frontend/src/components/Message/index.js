import React, { Component } from 'react'
import { connect } from 'react-redux'
// actions
import { setMessage } from '../../actions' 
// style
import './style.css'


class Message extends Component {
    constructor( props ){
        super( props )
        this.msgRef = React.createRef();
    }
    async componentDidMount(){
        // the message is removed after 5sec
        setTimeout( () => { 
            this.resetMessage()
        }, 5000 )
    }

    resetMessage = () => {
        this.props.setMessage({ show: false, header: '', content: '', type: null } )
    }

    render() {
        const { content, header, type } = this.props.msg

        return (
            <div className={`ui ${type} message`} ref={ this.msgRef } >
                <i className="close icon" onClick={ this.resetMessage }></i>
                <div className="header">
                    {header}
                </div>
                <p>{content}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { message : state.setMessageReducer.msg || state.setMessageReducer }
}

export default connect( mapStateToProps , { setMessage } )( Message )