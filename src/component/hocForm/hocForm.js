import React from 'react'

export function hocForm(Component) {
  return class WrapperComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange (type, val) {
      this.setState({
        [type]: val
      })
    }

    render() {
      return <Component handleChange={this.handleChange} state={this.state} { ...this.props }></Component>
    }
  }
}