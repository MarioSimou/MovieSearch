import React, { Component } from 'react'

class Message extends Component {
    componentDidMount(){
        // the message is removed after 5sec
        setTimeout(() => this.props.showMessage( false) , 5000 )
    }
    render() {
        const { content, header, type } = this.props.message

        return (
            <div className={`ui ${type} message`} >
                <i className="close icon" onClick={e => this.props.showMessage(false)}></i>
                <div className="header">
                    {header}
                </div>
                <p>{content}</p>
            </div>
        )
    }
}

export default Message