import * as controllers from './controllers'
import * as bodyParser from 'body-parser'
import { Server } from '@overnightjs/core'
import { Logger } from '@overnightjs/logger'
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser'
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors'
import {ErrorMiddleware} from './middleware/ErrorMiddleware'
import { body } from 'express-validator'

class RouterServer extends Server {

  private readonly SERVER_STARTED = 'Server started on port: '
  private readonly DB_NAME = 'mongodb+srv://Antonio:Egich.6384483.Egor@cluster-lab.hlzcu8o.mongodb.net/money-tracker?retryWrites=true&w=majority'

  constructor(){
    super(true)
    mongoose.set('strictQuery', true)
    mongoose
      .connect(this.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
      .then(res => Logger.Imp('Connected to db'))
      .then(error => Logger.Err(error))
    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: true}))
    this.app.use(cors({
      credentials: true,
      origin: 'http://localhost:3000'
    }))
    this.SetupControllers()
    this.app.use(ErrorMiddleware)
  }

  private SetupControllers(): void {
    const ctlrInstances = []
    for (const name in controllers){
      if (controllers.hasOwnProperty(name)) {
        const controller = (controllers as any)[name]
        ctlrInstances.push(new controller())
      }
    }
    super.addControllers(ctlrInstances)
  }

  public start(port: number): void {
    this.app.get('*', (req: Request, res: Response) => {
      res.send(this.SERVER_STARTED + port)
    })

    this.app.listen(port, () => {
      Logger.Imp(this.SERVER_STARTED + port)
    })
  }
}

export default RouterServer