import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/userchat.redux'

@connect(
  state => state.userchat,
  { getUserList }
)
class Boss extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {
          this.props.userList.map(item => (
            item.avatar && (
              <div key={item._id}>
                <Card>
                  <Card.Header
                    title={item.user}
                    thumb={require(`../../assets/${item.avatar}.png`)}
                    extra={<span>{item.title}</span>}
                  ></Card.Header>
                  <Card.Body>
                    { item.desc.split('\n').map((v, index) => (
                      <div key={index}>{v}</div>
                    )) }
                  </Card.Body>
                </Card>
                <WhiteSpace></WhiteSpace>
              </div>)
          ))
        }
      </WingBlank>
    )
  }
}

export default Boss