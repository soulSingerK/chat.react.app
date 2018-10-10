import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'


class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'genius'
    }
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <h2 style={{textAlign: 'center'}}>注册页</h2>
        <List>
          <InputItem>用户名</InputItem>
          <WhiteSpace />
          <InputItem>密码</InputItem>
          <WhiteSpace />
          <InputItem>确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem checked={this.state.type === 'genius'}>
            求职者
          </RadioItem>
          <WhiteSpace/>
          <RadioItem checked={this.state.type === 'boss'}>
            Boss
          </RadioItem>
          <WhiteSpace/>
          <Button type="primary">注册</Button>
        </List>
      </div>
    )
  }
}
export default Register