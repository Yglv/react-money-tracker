import { ReactElement, useState } from "react";
import { Cards } from "./Cards";
import { ITransactionPanel } from "../interfaces/ComponentsInterface";

const categories: Array<string> = ['Выберите категорию ','Еда', 'Гигиена', 'Жильё', 'Здоровье', 'Кафе', 'Машина', 'Одежда', 'Питомцы',
  'Подарки', 'Развлечения', 'Связь', 'Cпорт', 'Cчета', 'Транспорт', 'Такси','Депозиты', 'Зарплата', 'Сбережения']

export function TransactionPanel(props: ITransactionPanel):ReactElement{
  const [selectedValue, setSelectedValue] = useState<string>('')
  return (
    <div className="flex flex-col w-[70%] pt-[50px] pl-[10px]">
      <p className="text-[60px] text-sky-500 font-sans">Транзакции</p>
      <select onChange={(event) => setSelectedValue(event.target.value)} className="mt-[20px] w-[50%] h-[40px] text-[20px] cursor-pointer text-gray-400 border-2 border-sky-500 rounded-[15px] ">
        {categories.map(category => {
          return <option>{category}</option>
        })}
      </select>
      <Cards cardsData={props.data} selectedValue={selectedValue}/>
    </div>
  )
}