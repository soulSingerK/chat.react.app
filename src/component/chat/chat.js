import React from 'react'
import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'

const socket = io('ws://localhost:1313')
class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = { text: '', msgs: [] }
  }
  componentDidMount() {
    socket.on('recivemsg', (data) => {
      this.setState({
        msgs: [...this.state.msgs, data.msg]
      })
    })
  }

  handleSubmit() {
    socket.emit('sendmsg', { msg: this.state.text })
    this.setState({ text: '' })
  }

  render() {
    return (
      <div>
        { this.state.msgs.map(v => <p key={v}>{v}</p>) }
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