import $api from '../http/logAxios'
import { IAuthResponse } from '../interfaces/AuthInterface'

export default class AuthService {
  static async Login(email: string, password: string): Promise<IAuthResponse> {
    return $api.post('/login', {email, password})
  }

  static async Registration(email: string, password: string): Promise<IAuthResponse> {
    return $api.post('/registration', {email, password})
  }

  static async Logout(): Promise<void> {
    return $api.post('/logout')
  }
}