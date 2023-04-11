import { ValidationError } from "express-validator"

export class LogError extends Error {
  status: number
  errors: Array<ValidationError>

  constructor(status: number, message: string, errors: Array<ValidationError> = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnathorizedError() {
    return new LogError(401, 'Пользователь не авторизован')
  }

  static BadRequest(message: string, errors: Array<ValidationError> = []) {
    return new LogError(400, message, errors)
  }
}