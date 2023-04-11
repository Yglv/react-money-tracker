import { Types } from "mongoose"

export interface IUserDto{
  _id: Types.ObjectId,
  email: string,
  isActivated: boolean
}

export class UserDto{
  _id: Types.ObjectId
  email: string
  isActivated: boolean

  constructor(model: IUserDto){
    this.email = model.email
    this._id = model._id
    this.isActivated = model.isActivated
  }
}