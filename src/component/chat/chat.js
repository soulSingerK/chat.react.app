import React from 'react'
import io from 'socket.io-client'

class Chat extends React.Component {

  componentDidMount() {
    io('ws://localhost:1313')
  }

  render() {
    return (
      <h2>you are chat with { this.props.match.params.user }</h2>
    )
  }
}

export default Chat