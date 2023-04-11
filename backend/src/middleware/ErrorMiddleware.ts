import { LogError } from '../exceptions/LogError'
import { Request, Response} from 'express'

export function ErrorMiddleware(err: Error, req: Request, res: Response) {
  if (err instanceof LogError) {
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }
  return res.status(500).json('Unexpected exception')
}