import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state
)
class Msg extends React.Component {

  getLast(arr) {
    return arr[arr.length - 1]
  }

  render() {
    const chatMap = {}
    this.props.chat.msgList.forEach(item => {
      chatMap[item.chatid] = chatMap[item.chatid] || []
      chatMap[item.chatid].push(item)
    })
    const chatList = Object.values(chatMap).sort((a,b) => {
      const a_lastTime = this.getLast(a).create_time
      const b_lastTime = this.getLast(b).create_time
      return b_lastTime - a_lastTime
    })
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userInfo = this.props.chat.users
    return (
      chatList.map(item => {
        const showMsg = this.getLast(item)
        const targetId = item[0].from === userid ? item[0].to : item[0].from
        const unread = item.filter(v => !v.read && v.to === userid).length
        if (!userInfo[targetId]) return null
        return (
          <List key={showMsg._id}>
            <Item
              thumb={require(`../../assets/${userInfo[targetId].avatar}.png`)}
              extra={<Badge text={unread}></Badge>}
              arrow="horizontal"
              onClick={() => {
                this.props.history.push(`/chat/${targetId}`)
              }}
            >
              { userInfo[targetId].user }
              <Brief>{showMsg.content}</Brief>
            </Item>
          </List>
        )
      })
    )
  }
}

export default Msg