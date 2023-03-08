import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core'
import { Logger } from '@overnightjs/logger'
import { Transaction } from '../models/Transaction'

@Controller('api')
export class TransactionController {
  @Get(':msg')
  private async GetMessage(req: Request, res: Response) {
    Logger.Info(req.params.msg)
    const data = await Transaction.find()
    console.log(Array.from(data))
    res.status(200).send(Array.from(data))
  }

  @Put(':msg')
  private PutMessage(req: Request, res: Response) {
    Logger.Info(req.params.msg)
    return res.status(200).json({
      message: req.params.msg
    })
  }

  @Post(':msg')
  private PostMessage(req: Request, res: Response) {
    if (!req.body){
      res.status(404).json({
        message: 'Incorrect data'
      })
    }
    Logger.Info(req.body)
    const { sum, category } = req.body
    const date = new Date().toLocaleDateString()
    const transaction = new Transaction({ sum, category, date})
    transaction
      .save()
      .then(result => {
        Logger.Info(result)
        res.send(result)
      })
      .catch(error => {
        Logger.Err(error)
      })
    Logger.Info(req.params.msg)
  }

  @Delete(':msg')
  private async DeleteMessage(req: Request, res: Response) {
    if (!req.body){
      res.status(404).json({
        message: 'Incorrect data'
      })
    }
    console.log(req.body)
    const id = req.body.id
    const result = await Transaction.deleteOne({_id: id})
    Logger.Info(result)
  }
}
