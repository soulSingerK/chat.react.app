import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, getMsgList, reciveMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

@connect(
  state => state,
  { sendMsg, reciveMsg, getMsgList, readMsg }
)
class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = { text: '', emojiShow: false }
  }

  componentDidMount() {
    if (!this.props.chat.msgList.length) {
      this.props.getMsgList()
      this.props.reciveMsg()
    }
  }

  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }

  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const content = this.state.text
    this.props.sendMsg({ from, to, msg: content })
    this.setState({ text: '', emojiShow: false })
  }

  render() {
    const chat = this.props.chat
    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😣 😓 😳 🤓 😺 👨‍🍳 💂 👩‍ 🧛‍ 🙅‍ 🚶‍ 🙆‍'
      .split(' ')
      .filter(v => v)
      .map(item => ({ text: item }))
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = chat.users
    const showList = chat.msgList.filter(item => item.chatid === getChatId(userid, this.props.user._id))
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
        <div className="chat-list">
          { showList.map(v => {
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
        </div>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={ v => {
                this.setState({ text: v })
              }}
              extra={
                <div>
                  <span
                    role="img"
                    aria-label="123"
                    style={{marginRight: 10}}
                    onClick={() => {
                      this.setState({ emojiShow: !this.state.emojiShow })
                      this.fixCarousel()
                    }}
                  >😀</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          { this.state.emojiShow ? 
            <Grid
              data={emoji}
              columnNum={6}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(v) => {
                this.setState({
                  text: this.state.text + v.text
                })
              }}
            /> : null
          }
        </div>
      </div>
    )
  }
}

export default Chat