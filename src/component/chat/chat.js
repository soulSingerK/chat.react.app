import React from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, reciveMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  { getMsgList, sendMsg, reciveMsg }
)
class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = { text: '' }
  }
  componentDidMount() {
    this.props.getMsgList()
    this.props.reciveMsg()
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
    return (
      <div>
        { showList.length > 0 ? showList.map(v => <p key={v._id}>{v.content}</p>) : null}
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