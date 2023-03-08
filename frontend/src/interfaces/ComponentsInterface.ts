import React, { MouseEventHandler, ReactElement } from "react"
import { IData } from "./DataInterface"

export interface IModal{
  title: string,
  children?: ReactElement,
  isActive?: boolean,
  onClose: MouseEventHandler<HTMLSpanElement> | undefined
}

export interface IBalancePanel{
  data: Array<IData>,
  AddExpense(): void,
  AddRevenue(): void
}

export interface ITransactionPanel{
  data: Array<IData>
}

