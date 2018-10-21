import axios from 'axios'
import { USER, COMMON } from './actions.types'
import { getRedirectPath } from '../util'

const initState = {
  user: '',
  msg: '',
  type: '',
  redirectTo:''
}

// reducers 
function user(state = initState, action) {
  switch (action.type) {
    case USER.AUTHSUCCESS:
      return {
        ...state,
        ...action.payload,
        msg: '',
        redirectTo: getRedirectPath(action.payload)
      }
    case USER.LOAD_DATA: 
      return {
        ...state,
        ...action.payload
      }
    case COMMON.ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        isAuth: false
      }
    case USER.LOGOUT:
      return {
        ...initState,
        redirectTo: '/login'
      }
    default:
      return state
  }
}

// actions
function errorMsg (msg) {
  return {
    msg,
    type: COMMON.ERROR_MSG
  }
}

export function loadData (data) {
  return {
    type: USER.LOAD_DATA,
    payload: data
  }
}

export function userLogout() {
  return { type: USER.LOGOUT }
}

// handle
function authSuccess (data) {
  return {
    type: USER.AUTHSUCCESS,
    payload: data
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.code === 0) {
          dispatch(authSuccess(res.data))
        } else {
          dispatch(errorMsg(res.msg))
        }
      })
  }
}

// 登录
export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.code === 0) {
          dispatch(authSuccess(res.data))
        } else {
          dispatch(errorMsg(res.msg))
        }
      })
  }
}

// 注册
export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !repeatpwd) {
    return errorMsg('用户名和密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }

  return dispatch => {
    axios.post('/user/register', {user, pwd, type })
      .then(res => {
        if (res.code === 0) {
          dispatch(authSuccess({ user, pwd, type }))
        } else {
          dispatch(errorMsg(res.msg))
        }
      })
  }
}

export default user