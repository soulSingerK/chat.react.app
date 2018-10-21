import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'

import NavlinkBar from '../navlink-bar/navlink-bar'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import { getMsgList, reciveMsg } from '../../redux/chat.redux'

function Msg() {
  return <h2>消息列表</h2>
}


@connect(
  state => state,
  { getMsgList, reciveMsg }
)
class Dashboard extends React.Component {

  componentDidMount() {
    if (!this.props.chat.msgList.length) {
      this.props.getMsgList()
      this.props.reciveMsg()
    }
  }

  render() {
    const user = this.props.user
    const { pathname } = this.props.location
    const NavList = [
      {
        path: '/boss',
        text: '求职者',
        icon: 'boss',
        title: '求职者列表',
        hide: user.type === 'genius',
        component: Boss
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'boss列表',
        hide: user.type === 'boss',
        component: Genius
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar mode='dark' className="fixed-navbar">{ NavList.find(v => v.path === pathname).title }</NavBar>
        <Switch>
          {
            NavList.map(item => (
              <Route path={item.path} component={item.component} key={item.path}></Route>
            ))
          }
        </Switch>
        <NavlinkBar data={NavList}></NavlinkBar>
      </div>
    )
  }
}

export default Dashboard