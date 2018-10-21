// import io from 'socket.io-client'
import axios from 'axios'
// const socket = io('ws://localhost:1313')

const MSG_LIST = 'MSG_LIST'
const RECIVE_MSG = 'RECIVE_MSG'
const MSG_READ = 'MSG_READ'

const initState = {
  msgList: [],
  unread: 0
}

export function chat(state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {
        ...state,
        msgList: action.payload,
        unread: action.payload.filter(item => !item.read).length
      }
    case RECIVE_MSG: 
    case MSG_READ:
    default:
      return state
  }
}

function msgList(data) {
  return { type: MSG_LIST, payload: data }
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.code === 0) {
          dispatch(msgList(res.msgs))
        }
      })
  }
}

