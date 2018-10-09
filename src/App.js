import React from 'react'

class App extends React.Component {
  render() {
    const { store, doAdd, doReduce, doAddAsync } = {...this.props}
    return (
      <div>
        hello redux 现在是{store.getState()}
        <button onClick={() => { store.dispatch(doAdd()) }}>加1</button>
        <button onClick={() => { store.dispatch(doReduce()) }}>减1</button>
        <button onClick={() => { store.dispatch(doAddAsync()) }}>延时加1</button>
      </div>
    )
  }
}

export default App