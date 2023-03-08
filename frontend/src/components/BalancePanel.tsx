import { ReactElement } from "react";
import { IData } from "../interfaces/DataInterface";
import { IBalancePanel } from '../interfaces/ComponentsInterface'

export function BalancePanel(props: IBalancePanel):ReactElement{
  return (
    <div className="flex flex-col pt-[50px] pl-4 w-[30%]">
      <p className="text-[58px] text-black font-sans ml-5">Баланс:</p>
      <p className="text-[38px] text-black font-sans mb-[10vh] ml-5">{findSum(props.data)} BYN</p>
      <form action="/menu" method="get">
        <div className="flex flex-col justify-around pl-[5%]">
          <button type='button' onClick={ props.AddRevenue } className=" leading-4 font-sans w-[220px] h-[60px] text-[40px] mb-[25px] bg-sky-500 text-white rounded-[25px] hover:bg-white hover:text-sky-500 hover:border-2 hover:border-sky-500">+</button>
          <button type='button' onClick={ props.AddExpense } className="leading-4 w-[220px] h-[60px] text-[40px] bg-sky-500 text-white rounded-3xl hover:bg-white hover:text-sky-500 hover:border-2 hover:border-sky-500">-</button>
        </div>
      </form>
    </div>
  )
}

const findSum = (data: Array<IData>):number=> {
  let sumOfCards = 0
  data.forEach(item => {
    sumOfCards += item.sum
  })
  console.log(sumOfCards)
  return sumOfCards
}