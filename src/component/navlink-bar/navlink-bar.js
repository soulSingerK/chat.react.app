import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@connect(
  state => state.chat
)
@withRouter
class NavlinkBar extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const { pathname } = this.props.location
    return (
      <TabBar>
        {
          this.props.data.filter(v => !v.hide)
            .map(item => (
              <TabBar.Item
                badge = { item.path === '/msg' ? this.props.unread : 0 }
                title = { item.text }
                key = { item.path }
                icon = {{ uri: require(`../../assets/${item.icon}.png`) }}
                selectedIcon = {{ uri: require(`../../assets/${item.icon}-active.png`) }}
                selected = { pathname === item.path }
                onPress = { () => { this.props.history.push(item.path) } }
              >
              </TabBar.Item>
            ))
        }
      </TabBar>
    )
  }
}

export default NavlinkBar