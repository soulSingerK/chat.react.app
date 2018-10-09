import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store, {doAdd, doReduce, doAddAsync} from './index.redux'

function render() {
  ReactDOM.render(
    <App
      store={store}
      doAdd={doAdd}
      doReduce={doReduce}
      doAddAsync={doAddAsync}
    />,
    document.getElementById('root')
  )
}
render()
store.subscribe(render)

