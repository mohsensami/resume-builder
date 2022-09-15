import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
})

export default axiosInstance