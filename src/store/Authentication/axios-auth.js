import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://mysportshive.com/sportsHive/api'
  baseURL: 'http://127.0.0.1:8000/api'

})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance