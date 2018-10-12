import React from 'react'
import { NavBar, InputItem, TextareaItem } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: ''
    }
  }

  handleChange(type, val) {
    this.setState({
      [type]: val
    })
  }

  render() {
    return (
      <div>
        <NavBar mode="light">BOSS 完善信息页</NavBar>
        <AvatarSelector></AvatarSelector>
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
          招聘职位
        </InputItem>
        <TextareaItem 
          onChange={(v) => this.handleChange('desc', v)}
          title="招聘要求"
          rows = {3}
          autoHeight
          >
          
        </TextareaItem>
      </div>
    )
  }
}

export default BossInfo