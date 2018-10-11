import axios from 'axios'
import { USER, COMMON } from './actions.types'


const initState = {
  user: '',
  isAuth: false,
  msg: '',
  type: '',
  pwd: ''
}

// reducers 
function user(state = initState, action) {
  switch (action.type) {
    case USER.REGISTER_SUCCESS:
      return {
        ...state,
        ...action.paylod,
        msg: '',
        isAuth: true
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
    paylod: data
  }
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !repeatpwd) {
    return errorMsg('用户名和密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }

  axios.post('/user/register', { user, pwd, type }).then(res => {
    
    return dispatch => {
      if (res.code === 0) {
        dispatch(registerSuccess({ user, pwd, type }))
      } else {
        dispatch(errorMsg(res.msg))
      }
    }
  })
}

export default user