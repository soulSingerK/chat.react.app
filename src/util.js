export function getRedirectPath ({ type, avatar }) {
  let url = type === 'boss' ? '/boss' : '/genius' 
  if (!avatar) {
    url += 'info'
  }
  return url
}

export function getChatId(from, to) {
  console.log(from, to)
  return [from, to].sort().join('_')
}