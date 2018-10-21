import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { register } from '../../redux/user.redux'
import { hocForm } from '../../component/hocForm/hocForm'

@connect(
  state => state.user,
  { register }
)
@hocForm
class Register extends React.Component {
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }

  handleRegister() {
    this.props.register(this.props.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        { this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}

        { this.props.redirectTo ?  <Redirect to={this.props.redirectTo}/> : null}
        <h2 style={{textAlign: 'center'}}>注册页</h2>
        <List>
          <InputItem
            onChange={(val) => this.props.handleChange('user', val)}  
          >
            用户名
          </InputItem>
          <WhiteSpace />
          <InputItem
            type='password'
            onChange={val => this.props.handleChange('pwd', val)}
          >
            密码
          </InputItem>
          <WhiteSpace />
          <InputItem
            type='password'
            onChange={val => this.props.handleChange('repeatpwd', val)}
          >
            确认密码
          </InputItem>
          <WhiteSpace/>
          <RadioItem 
            checked={this.props.state.type === 'genius'}
            onChange={() => this.props.handleChange('type', 'genius')}
          >
            求职者
          </RadioItem>
          <WhiteSpace/>
          <RadioItem 
            checked={this.props.state.type === 'boss'}
            onChange={() => this.props.handleChange('type', 'boss')}
          >
            Boss
          </RadioItem>
          <WhiteSpace/>
          <Button
            type="primary"
            onClick={() => this.handleRegister()}
          >
            注册
          </Button>
        </List>
      </div>
    )
  }
}
export default Register