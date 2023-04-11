import jwt from 'jsonwebtoken'
import { ITokenSchema, Token } from '../models/Token'
import { IUserDto } from '../dtos/UserDto'
import { Types } from 'mongoose'

const JWT_ACCESS_SECRET='jwt-secret-key'

export interface IToken{
  accessToken: string,
  refreshToken: string
}

class TokenService{
  generateToken(payload: IUserDto): IToken{
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string): Promise<ITokenSchema> {
    console.log(refreshToken)
    const tokenData = await Token.findOne({ userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
    }

    const token = await Token.create({user: userId, refreshToken})
    return token
  }

  async removeToken(refreshToken: string) {
    console.log(refreshToken)
    const tokenData = await Token.deleteOne({ refreshToken })
    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken })
    return tokenData
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token: string)  {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }

  
}

export const tokenService = new TokenService()