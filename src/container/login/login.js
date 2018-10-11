import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Login extends React.Component {
  componentDidMount() {
    // axios.get('/user').then(res => {
    //   console.log(res)
    // })
  }
  onRegister() {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div>
        <Logo></Logo>
        <h2 style={{textAlign: 'center'}}> 登录页 </h2>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={() => { this.onRegister() }}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login