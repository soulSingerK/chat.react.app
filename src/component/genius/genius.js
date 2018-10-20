import React from 'react'
import { connect } from 'react-redux'

import UserCard from '../usercard/usercard'
import { getUserList } from '../../redux/userchat.redux'

@connect(
  state => state.userchat,
  { getUserList }
)
class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }

  render() {
    return (
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}

export default Genius