import { USERCHAT } from './actions.types'
import axios from 'axios'

const initState = {
  userList: []
}

export function userchat(state = initState,action) {
  switch(action.type) {
    case USERCHAT.USER_LIST:
      return { ...state, userList: action.payload }
    default:
      return state
  }
}

function userList(data) {
  return {
    type: USERCHAT.USER_LIST,
    payload: data
  }
}

export function getUserList(type) {
  return dispatch => {
    axios.get(`/user/list?type=${type}`)
      .then(res => {
        if (res.code === 0) {
          dispatch(userList(res.data))
        }
      })
  }
}