import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'

class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
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
                    { item.type === 'boss' ? <div>公司：{item.company}</div> : null }
                    { item.desc.split('\n').map((v, index) => (
                      <div key={index}>{v}</div>
                    )) }
                    { item.type === 'boss' ? <div>薪资： {item.money}</div> : null }
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

export default UserCard