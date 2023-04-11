import { User } from '../models/User'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { mailService } from './MailService'
import { tokenService } from './TokenService'
import { UserDto, IUserDto } from '../dtos/UserDto'
import { IToken } from './TokenService'
import { API_URL } from './MailService'
import { LogError } from '../exceptions/LogError'
import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'

export interface IRegistration{
  tokens: IToken,
  user: IUserDto
}

interface IUser{
  _id: Types.ObjectId,
  email: string,
  password: string,
  isActivated: boolean,
  activationLink?: string
}

class UserService {
  async GetRegistration(email: string, password: string):Promise<IRegistration> {
    const candidate = await User.findOne({email})
    if (candidate) {
      throw LogError.BadRequest(`User exists`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4()
    const user = await User.create({email, password: hashPassword, activationLink})
    await mailService.sendActivationLink(email,`${API_URL}/log/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto._id, tokens.refreshToken)

    return {tokens: tokens, user: userDto}
  }

  async activate(activationLink: string){
    const user = await User.findOne({activationLink})
    if (!user){
      throw LogError.BadRequest('Incorrect activation link')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email: string, password: string): Promise<IRegistration> {
    const user: IUser | null = await User.findOne({email})
    if (!user) {
      throw LogError.BadRequest('User not found')
    }
    const isPassEquals: boolean = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw LogError.BadRequest('Incorrect password')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto._id, tokens.refreshToken)

    return {tokens: tokens, user: userDto}
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw LogError.UnathorizedError()
    }
    const userData: IUserDto = tokenService.validateRefreshToken(refreshToken) as IUserDto
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw LogError.UnathorizedError()
    }
    const token = await tokenService.removeToken(refreshToken)
    const user: IUser | null = await User.findById(userData._id)
    if (user === null) {
      throw LogError.BadRequest('Incorrect user')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto._id, tokens.refreshToken)

    return {data: {tokens: tokens}, user: userDto}
  }
}

export const userService = new UserService()