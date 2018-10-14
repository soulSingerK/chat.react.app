import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    }
  }

  handleChange(type, val) {
    this.setState({
      [type]: val
    })
  }

  render() {
    const redirect = this.props.redirectTo
    const path = this.props.location.pathname
    return (
      <div>
        { redirect && redirect !== path ? <Redirect to={this.props.redirectTo}/> : null }
        <NavBar mode="light">BOSS 完善信息页</NavBar>
        <AvatarSelector handleAvatar={ val => this.handleChange('avatar', val) }></AvatarSelector>
        <InputItem 
          onChange={(v) => this.handleChange('title', v)}
          >
          招聘职位
        </InputItem>
        <InputItem 
          onChange={(v) => this.handleChange('company', v)}
          >
          公司名称
        </InputItem>
        <InputItem 
          onChange={(v) => this.handleChange('money', v)}
          >
          招聘薪资
        </InputItem>
        <TextareaItem 
          onChange={(v) => this.handleChange('desc', v)}
          title="招聘要求"
          rows = {3}
          autoHeight
          >
        </TextareaItem>
        <Button
          type='primary'
          onClick={() => this.props.update(this.state)}
          >
          保存
        </Button>
      </div>
    )
  }
}

export default BossInfo