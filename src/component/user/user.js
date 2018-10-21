import React from 'react'
import { List, Result, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import browserCookies from 'browser-cookies'
import { Redirect } from 'react-router-dom'

import { userLogout } from '../../redux/user.redux'

@connect(
  state => state.user,
  { userLogout }
)
class User extends React.Component {

  logout() {
    const alert = Modal.alert
    alert('注销', '确定退出登录吗？', [
      {
        text: '取消', onPress: () => console.log('cancel')
      },
      {
        text: '确定', onPress: () => {
          browserCookies.erase('userid')
          this.props.userLogout()
        }
      }
    ])
  }

  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const props = this.props
    return props.user ? (
      <div>
        <Result
          img= { <img src={require(`../../assets/${props.avatar}.png`)} alt=""/> }
          title = {props.user}
          message = {props.type === 'boss' ? props.company : null}
        />  
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            { props.title }
            { props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>) }
            { props.money ? <Brief>薪资：{props.money}</Brief> : null }
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={() => this.logout()}>
            退出登录
          </Item>
        </List>
      </div>
    ) : <Redirect to={ props.redirectTo }/>
  }
}

export default User