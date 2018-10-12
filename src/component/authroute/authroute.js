import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

@withRouter
@connect(
  null,
  { loadData }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const routeList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (routeList.indexOf(pathname) > -1) {
      return null
    }
    axios.get('/user/info').then(res => {
      if (res.code === 0) {
        this.props.loadData(res.data)
      } else {
        this.props.history.push('/login')
      }
      
    })
  }
  render() {
    return null
  }
}

export default AuthRoute