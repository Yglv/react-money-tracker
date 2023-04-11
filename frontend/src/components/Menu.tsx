import { ReactElement, useContext, useEffect, useState } from "react";
import { Modal } from "./Modal";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { IData } from '../interfaces/DataInterface'
import { BalancePanel } from "./BalancePanel";
import { TransactionPanel } from "./TransactionPanel";
import { observer } from 'mobx-react-lite'
import { Context } from "..";

const spendingCategories: Array<string> = ['Выберите категорию ','Еда', 'Гигиена', 'Жильё', 'Здоровье', 'Кафе', 'Машина', 'Одежда', 'Питомцы',
  'Подарки', 'Развлечения', 'Связь', 'Cпорт', 'Cчета', 'Транспорт', 'Такси']
const profitCategories: Array<string> = ['Выберите категорию ','Депозиты', 'Зарплата', 'Сбережения']

type Inputs = {
  sum: string,
  category: string
}

function Menu():ReactElement {
  const [isExpense, setIsExpense] = useState<boolean>(true)
  const [isActive, setIsActive] = useState<boolean>(false)
  const { register, handleSubmit } = useForm<Inputs>()
  const [data, setData] = useState<Array<IData>>([])
  const {store} = useContext(Context)
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/:msg')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [])
  
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
    axios.post('http://localhost:5000/api/:msg', JSON.stringify(data), { headers: {'Content-Type': 'application/json;charset=utf-8'} })
      .then(res => console.log(res))
      .then(() => setIsActive(false))
      .catch(err => console.error(err))
    axios.get('http://localhost:5000/api/:msg')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }

  const modal: ReactElement = 
    (<Modal title="Добавить транзакцию" isActive={isActive} onClose={() => setIsActive(false) }>
      <form action="http://localhost:5000/api/:msg" onSubmit={handleSubmit(onSubmit)} method="post" className="flex flex-col w-[100%] h-[85%] items-center justify-around mt-1">
        { (isExpense) ?
        <>
          <input type="number" max="0" required {...register('sum')} placeholder="Введите сумму" className="w-[60%] h-[30px] text-[20px] text-gray-500 border-2 border-white border-b-sky-500 pl-1"/>
          <select {...register('category')} className="w-[60%] h-[30px] text-[20px] text-gray-400 border-2 border-white border-b-sky-500 ">
            {spendingCategories.map(category => {
              return <option>{category}</option>
            })}
          </select>
        </> :
        <>
          <input type="number" min="0" required placeholder="Введите сумму" {...register('sum')} className="w-[60%] h-[30px] text-[18px] text-gray-500 border-2 border-white border-b-sky-500 pl-1 pb-1"/>
          <select  {...register('category')} className="w-[60%] h-[30px] text-[18px] text-gray-400 border-2 border-white border-b-sky-500 pb-1">
            {profitCategories.map(category => {
              return <option>{category}</option>
            })}
          </select> 
        </>}
        <button type="submit" className="bg-sky-500 w-[60%] h-[40px] rounded-[15px] text-white text-[20px] border-white self-center cursor-pointer hover:bg-white hover:border-2 hover:border-sky-500 hover:text-sky-500">Подтвердить</button>
      </form>
    </Modal>)

  return (
    <>
     { modal }
     <h1 className="text-4xl text-sky-500 font-sans p-4 border-sky-500 border-4 w-[20%] border-l-white border-t-white rounded-br-2xl">Money tracker</h1>
     <div className="absolute top-0 left-[70%] w-[30%] flex justify-between">
      <p className="text-2xl text-gray-500 mt-[10px]">{store.user.email}</p>
      <button
        className="group  bg-sky-500 w-[140px] h-[50px] rounded-[15px] text-white text-[20px] border-white self-center cursor-pointer hover:bg-white hover:border-2 hover:border-sky-500 hover:text-sky-500" 
        onClick={() => store.logout()}>
          <span className="text-white group-hover:text-sky-500 mr-[15px] text-2xl">Exit</span>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
     </div>
     <div className="flex">
       <BalancePanel data={data} AddExpense={() => { setIsExpense(true); setIsActive(true)}} AddRevenue={() => { setIsExpense(false); setIsActive(true)}}/>
       <TransactionPanel data={data}/>
     </div>    
    </>
  )
}

export default Menu

