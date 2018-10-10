import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component {
  componentDidMount() {
    const routeList = ['/login', '/register']
    axios.get('/user/info').then(res => {
      console.log(res)
      if (res.code === 1) {
        const pathname = this.props.location.pathname
        if (routeList.indexOf(pathname) > -1) {

        } else {
          this.props.history.push('/login')
        }
      } else {
        console.log('success')
      }
    })
  }
  render() {
    return null
  }
}

export default AuthRoute