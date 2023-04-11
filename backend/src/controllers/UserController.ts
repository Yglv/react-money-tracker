import { CookieOptions, NextFunction, Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete, ClassOptions, ClassMiddleware } from '@overnightjs/core'
import { Logger } from '@overnightjs/logger'
import { userService } from '../services/UserService';
import { body, validationResult } from 'express-validator'
import { LogError } from '../exceptions/LogError';

@Controller('log')
@ClassMiddleware([ body('email').isEmail(), body('password').isLength({min: 3, max: 32})])
export class UserController {
  @Get('activate/:link')
  private async GetActivateLinkMessage(req: Request, res: Response, next: NextFunction) {
    try{
      Logger.Info(req.params.msg)
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect('http://localhost:3000')
    }catch(error) {
      next(error)
    }
  }

  @Post('registration')
  private async PostRegistration(req: Request, res: Response, next: NextFunction) {
    try{
      Logger.Info(req.body)
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(LogError.BadRequest('Validation Error', errors.array()))
      }
      const { email, password } = req.body
      const userData = await userService.GetRegistration(email, password)
      res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
      return res.json(userData)
    }
    catch(error){
      next(error)
    }
  }

  @Post('login')
  private async PostLoginMessage(req: Request, res: Response, next: NextFunction) {
    try{
      const {email, password} = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
      return res.json(userData)
    }catch(error){
      next(error)
    }
  }

  @Post('logout')
  private async PostLogoutMessage(req: Request, res: Response, next: NextFunction) {
    try{
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json(token)
    }catch(error){
      next(error)
    }
  }

  @Get('refresh')
  private async GetRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.data.tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }
}
