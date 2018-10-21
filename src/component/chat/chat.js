import React from 'react'

class Chat extends React.Component {

  render() {
    return (
      <h2>you are chat with { this.props.match.params.user }</h2>
    )
  }
}

export default Chat