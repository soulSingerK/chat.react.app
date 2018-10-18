
import { combineReducers } from 'redux'
import user from './redux/user.redux'
import { userchat } from './redux/userchat.redux'

export default combineReducers({ user, userchat })