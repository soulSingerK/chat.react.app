import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import TodoApp from './todoApp'

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
// import App from './App'
// import store, {doAdd, doReduce, doAddAsync} from './index.redux'

// function render() {
//   ReactDOM.render(
//     <App
//       store={store}
//       doAdd={doAdd}
//       doReduce={doReduce}
//       doAddAsync={doAddAsync}
//     />,
//     document.getElementById('root')
//   )
// }
// render()
// store.subscribe(render)

