import mongoose, { Types } from 'mongoose';
import { User } from './User'
const Schema = mongoose.Schema

export interface ITokenSchema{
  user?: Types.ObjectId | undefined,
  refreshToken: string
}

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  refreshToken: {
    type: String,
    required: true
  }
})

export const Token = mongoose.model('Token', tokenSchema)