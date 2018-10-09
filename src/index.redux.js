import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
const ACTIONS = {
  ADD_ACTION: 'ADD_ACTION',
  REDUCE_ACTION: 'REDUCE_ACTION'
}

function toDoApp (state = 10, action) {
  switch(action.type) {
    case ACTIONS.ADD_ACTION: 
      return state + 1
    case ACTIONS.REDUCE_ACTION: 
      return state - 1
    default:
      return 10
  }
}

export function doAdd() {
  return {
    type: ACTIONS.ADD_ACTION
  }
}

export function doReduce() {
  return {
    type: ACTIONS.REDUCE_ACTION
  }
}

export function doAddAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(doAdd())
    }, 2000)
  }
}

const store = createStore(toDoApp, 
  window.__REDUX_DEVTOOLS_EXTENSION__  && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)


export default store

