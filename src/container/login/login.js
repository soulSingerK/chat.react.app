import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../redux/user.redux'
import Logo from '../../component/logo/logo'
import { hocForm } from '../../component/hocForm/hocForm'

@connect(
  state => state.user,
  { login }
)
@hocForm
class Login extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     user: '',
  //     pwd: ''
  //   }
  // }
  // componentDidMount () {
  // }
  onRegister () {
    this.props.history.push('/register')
  }

  handleLogin () {
    this.props.login(this.props.state)
  }

  render() {
    return (
      <div>
        <Logo></Logo>
        <h2 style={{textAlign: 'center'}}> 登录页 </h2>
        { this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        { this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null }
        <WingBlank>
          <List>
            <InputItem
              onChange={(v) => this.props.handleChange('user', v)}
              >
              用户
            </InputItem>
            <InputItem
              type="password"
              onChange={(v) => this.props.handleChange('pwd', v)}
              >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.handleLogin()}>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={() => { this.onRegister() }}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login