import React from 'react'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: ''
    }
  }

  handleAvatarSelector(val) {
    this.setState({
      avatar: val.icon
    })
  }

  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
    const gridData = avatarList.split(',').map(name => {
      return {
        icon: require(`../../assets/${name}.png`),
        name: name
      }
    })
    const gridHeader = this.state.avatar ?
      (
        <div>
          <span>已选择头像</span>
          <img src={this.state.avatar} style={{width: '20px', paddingLeft: '10px'}} alt=""/>
        </div>
      ) :
      '请选择头像'
    return (
      <List renderHeader={() => gridHeader}>
        <Grid 
          data={gridData}
          onClick={(val) => this.handleAvatarSelector(val)}
          columnNum={5}
        >
        </Grid>
      </List>
    )
  }
}

export default AvatarSelector