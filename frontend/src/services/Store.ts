import { IUser } from "../interfaces/UserInterface";
import { makeAutoObservable } from "mobx";
import AuthService from "./AuthService";
import { IAuthResponse } from "../interfaces/AuthInterface";
import axios from "axios";

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false
  isExist = false
  
  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setIsExist(bool: boolean) {
    this.isExist = bool
  }

  async login(email: string, password: string) {
    try{
      const response = await AuthService.Login(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.tokens.accessToken)
      this.setAuth(true)
      this.setUser(response.user)
      window.location.reload()
    } catch(error) {
      console.log(error)
      this.setAuth(false)
    }
  }

  async registration(email: string, password: string) {
    try{
      const response = await AuthService.Registration(email, password)
      localStorage.setItem('token', response.data.tokens.accessToken)
      console.log(response.message)
      this.setAuth(true)
      this.setUser(response.user)
    } catch(error) {
      console.log(error)
      this.setIsExist(true)
    }
  }

  async logout() {
    try{
      const response = await AuthService.Logout()
      console.log(response)
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch(error) {
      console.log(error)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get<IAuthResponse>('http://localhost:5000/log/refresh', {withCredentials: true})
      console.log(response)
      localStorage.setItem('token', response.data.data.tokens.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoading(false)
    }
  }

}