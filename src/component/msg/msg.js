import React from 'react'
import { connect } from 'react-redux'

@connect(
  state => state
)
class Msg extends React.Component {
  render() {
    const chatMap = {}
    this.props.chat.msgList.forEach(item => {
      chatMap[item.chatid] = chatMap[item.chatid] || []
      chatMap[item.chatid].push(item)
    })
    console.log(chatMap)
    return (
      <h2>消息列表</h2>
    )
  }
}

export default Msg