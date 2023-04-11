import { IUser } from "./UserInterface";

export interface IAuthResponse{
  message: string,
  data: {
    tokens: {
      accessToken: string,
      refreshToken: string
    }
  }
  user: IUser
}