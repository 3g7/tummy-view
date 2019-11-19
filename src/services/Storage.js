var storage = {
  set (key, value) {
    return new Promise((resolve, reject) => {
      localStorage.setItem(key, JSON.stringify(value))
      resolve()
    })
  },
  get (key) {
    let value = localStorage.getItem(key)
    if (value !== 'undefined') {
      return JSON.parse(value)
    } else {
      return undefined
    }
  },
  remove (key) {
    localStorage.removeItem(key)
  }
}
export default storage
