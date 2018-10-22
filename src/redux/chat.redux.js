import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:1313')

const MSG_LIST = 'MSG_LIST'
const RECIVE_MSG = 'RECIVE_MSG'
const MSG_READ = 'MSG_READ'

const initState = {
  msgList: [],
  users: {},
  unread: 0
}

export function chat(state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {
        ...state,
        msgList: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter(item => !item.read && item.to === action.payload.userid).length
      }
    case RECIVE_MSG:
      const num = action.payload.to === action.userid ? 1 : 0
      return {
        ...state,
        msgList: [...state.msgList, action.payload],
        unread: state.unread + num
      }
    case MSG_READ:
      return {
        ...state,
        msgList: state.msgList.map(v => {
          if (v.from === action.payload.from) {
            v.read = true
          }
          return v
        }),
        unread: state.unread - action.payload.num
      }
    default:
      return state
  }
}

function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: {msgs, users, userid} }
}

function reciveMsgFrom(msg, userid) {
  return { userid, type: RECIVE_MSG, payload: msg }
}

function readMsgs({ from, userid, num }) {
  return {
    type: MSG_READ,
    payload: { from, userid, num }
  }
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', { from })
      .then(res => {
        const userid = getState().user._id
        if (res.code === 0) {
          dispatch(readMsgs({ userid, from, num: res.num }))
        }
      })
  }
}

export function reciveMsg() {
  return (dispatch, getState) => {
    socket.on('recivemsg', (data) => {
      const userid = getState().user._id
      dispatch(reciveMsgFrom(data, userid))
    })
  }
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, content: msg })
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.code === 0) {
          const userid = getState().user._id
          dispatch(msgList(res.msgs, res.users, userid))
        }
      })
  }
}

