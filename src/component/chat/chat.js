import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, getMsgList, reciveMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  { sendMsg, reciveMsg, getMsgList }
)
class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  componentDidMount() {
    if (!this.props.chat.msgList.length) {
      this.props.getMsgList()
      this.props.reciveMsg()
    }
  }

  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const content = this.state.text
    this.props.sendMsg({ from, to, msg: content })
    this.setState({ text: '' })
  }

  render() {
    const chat = this.props.chat
    const showList = chat.msgList.filter(item => item.content)
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = chat.users
    if (!users[userid]) {
      return null
    }
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >{users[userid].user}</NavBar>
        { showList.map(v => {
          console.log(v)
          console.log(users, users[v.from], v.from)
            const avatar = require(`../../assets/${users[v.from].avatar}.png`)
            return v.from === userid ? 
            (<List key={v._id}>
               <Item thumb={avatar}>{v.content}</Item>
            </List>) :
            <List className="chat-me" key={v._id}>
              <Item extra={<img src={avatar} alt=""/>}>{v.content}</Item>
            </List>
          })
        }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={ v => {
                this.setState({ text: v })
              }}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat