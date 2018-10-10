
function getCounter(state, action) {
  switch(action.type) {
    case '1':
      return state + 1
    default:
      return state
  }
}
export default getCounter