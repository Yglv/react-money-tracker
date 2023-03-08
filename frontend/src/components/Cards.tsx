import { ReactElement } from "react";
import { Card } from "./Card";
import { ICardsData } from '../interfaces/DataInterface'

export function Cards(props: ICardsData): ReactElement{
  return (
    <div className="grid grid-cols-2 w-[88%] gap-y-[20px] gap-x-[70px] mt-[30px]">
      {props.cardsData.map(dataCard => {
        if (props.selectedValue === '' || props.selectedValue ==='Выберите категорию' || props.selectedValue === dataCard.category)
          return <Card data={dataCard} />
      })}
    </div>
  )
}