import axios from "axios";
import { IAuthResponse } from "../interfaces/AuthInterface";

export const API_URL = 'http://localhost:5000/log'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(config => {
  return config
}, async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401) {
    try {
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.data.tokens.accessToken)
      return $api.request(originalRequest)
    }catch (error) {
      console.log('Unathorized')
    }
  }
})

export default $api