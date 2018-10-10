import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  user: '',
  isAuth: false,
  msg: '',
  type: '',
  pwd: ''
}

function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.paylod,
        msg: '',
        isAuth: true
      }
    case ERROR_MSG:
      console.log('error')
      return {
        ...state,
        msg: action.msg,
        isAuth: false
      }
    default:
      return state
  }
}

function errorMsg (msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

function registerSuccess (data) {
  return {
    type: REGISTER_SUCCESS,
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