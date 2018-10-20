import React from 'react'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/userchat.redux'
import UserCard from '../usercard/usercard'

@connect(
  state => state.userchat,
  { getUserList }
)
class Boss extends React.Component {
  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    return (
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}

export default Boss