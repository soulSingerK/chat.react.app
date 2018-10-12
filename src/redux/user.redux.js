import axios from 'axios'
import { USER, COMMON } from './actions.types'
import { getRedirectPath } from '../util'

const initState = {
  user: '',
  isAuth: false,
  msg: '',
  type: '',
  redirectTo:''
}

// reducers 
function user(state = initState, action) {
  switch (action.type) {
    case USER.REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        msg: '',
        isAuth: true,
        redirectTo: getRedirectPath(action.payload)
      }
    case USER.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        msg: '',
        isAuth: true,
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

// handle
function registerSuccess (data) {
  return {
    type: USER.REGISTER_SUCCESS,
    payload: data
  }
}

function loginSuccess (data) {
  return {
    type: USER.LOGIN_SUCCESS,
    payload: data
  }
}

export function loadData (data) {
  return {
    type: USER.LOAD_DATA,
    payload: data
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
          dispatch(loginSuccess(res.data))
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
          dispatch(registerSuccess({ user, pwd, type }))
        } else {
          dispatch(errorMsg(res.msg))
        }
      })
  }
}

export default user