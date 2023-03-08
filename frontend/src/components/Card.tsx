import { ReactElement } from "react";
import { ICardData } from "../interfaces/DataInterface";
import axios from "axios";

export function Card(props: ICardData): ReactElement{
  const removeHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const id = event.currentTarget.dataset.id
    console.log(id)
    const data = {
      id
    }
    axios.delete('http://localhost:5000/api/:msg',{ data: data } )
    window.location.reload()
  }
  let sum: ReactElement = (props.data.sum >= 0) ?
    (<p className="text-[50px] mr-[20px] text-green-500 text-bold group-hover:text-lime-400">+{props.data.sum} BYN</p>) :
    (<p className="text-[50px] mr-[20px] text-red-500 text-bold group-hover:text-red-400">{props.data.sum} BYN</p>)
  return (
    <div className="group flex relative max-w-[600px] min-w-[350px] w-full min-h-[140px] border-2 border-sky-500 rounded-[25px]  hover:text-white hover:bg-sky-500">
      <div className="flex items-center justify-center flex-col justify-around w-full h-full">
        {sum}
        <div>
          <p className="text-[34px] font-sans font-normal">{props.data.category}</p>
          <p className="text-[34px] font-sans mt-[-5px]">{props.data.date}</p>
        </div>
      </div>
      <form action="http://localhost:5000/api/:msg" className="hidden absolute top-[-1.5px] left-[90%] w-[46px] h-[175px] group-hover:block">
        <button data-id={props.data._id} onClick={event => removeHandler(event)} className="flex pt-[12px] justify-center h-full w-full rounded-br-[25px] rounded-tr-[25px] bg-red-500 hover:bg-red-700">
          <i className="fa-solid fa-trash text-[18px]"></i>
        </button>
      </form>
    </div>
  )
}