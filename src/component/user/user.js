import React from 'react'
import { List, Result } from 'antd-mobile'
import { connect } from 'react-redux'

@connect(
  state => state.user
)
class User extends React.Component {
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
        <List>
          <Item>
            退出登录
          </Item>
        </List>
      </div>
    ) : null
  }
}

export default User