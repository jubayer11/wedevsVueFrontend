import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://mysportshive.com/sportsHive/api'
  baseURL: 'http://127.0.0.1:8000/api'

})

if (localStorage.getItem('token'))
{
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

export default instance