import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'

import NavlinkBar from '../navlink-bar/navlink-bar'

@connect(
  state => state
)
class Dashboard extends React.Component {
  render() {
    const user = this.props.user
    const { pathname } = this.props.location
    const NavList = [
      {
        path: '/boss',
        text: '求职者',
        icon: 'boss',
        title: '求职者列表',
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'boss列表',
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
      }
    ]
    return (
      <div>
        <NavBar mode='dark'>{ NavList.find(v => v.path === pathname).title }</NavBar>
        <div>content</div>
        <NavlinkBar data={NavList}></NavlinkBar>
      </div>
    )
  }
}

export default Dashboard