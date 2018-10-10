import React from 'react'
import imgUrl from './logo.png'
import './logo.css'

class Logo extends React.Component {
  render() {
    return (
      <div className="img-position">
        <img src={imgUrl} alt=""/>
      </div>
    )
  }
}

export default Logo