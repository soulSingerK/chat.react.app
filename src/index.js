import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import reducers from './reducers'
import './axios.config'
import './index.css'

import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import AuthRoute from './component/authroute/authroute'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path="/bossinfo" component={BossInfo}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)