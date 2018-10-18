import React from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

class Boss extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('/user/list?type=genius')
      .then(res => {
        if (res.code === 0) {
          this.setState({
            data: res.data
          })
        }
      })
  }

  render() {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {
          this.state.data.map(item => (
            item.avatar && (
              <div>
                <Card key={item._id}>
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