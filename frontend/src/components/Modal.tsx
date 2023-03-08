import { ReactElement } from "react";
import { IModal } from '../interfaces/ComponentsInterface'

export function Modal(props: IModal): ReactElement | null{
  if (!props.isActive){
    return null
  }
  return (
    <div className={"absolute z-10 my-0 mx-auto left-[30%] top-[20%] transate-x-[-30%] translate-y-[-20%] w-[40%] h-[55%]  rounded-[50px]"}>
      <div className="bg-white w-[100%] h-[100%] rounded-[50px] border-2 border-sky-500">
        <div className="p-5 flex items-center justify-between text-white h-[15%] bg-sky-500 rounded-tl-[48px] rounded-tr-[48px]">
          <span className="text-[24px] font-sans">{props.title}</span>
          <span className="text-white font-sans text-[32px] font-bold hover:text-red-500 cursor-pointer" onClick={props.onClose}>&times;</span>
        </div>
        <div className="flex flex-col items-center h-[85%] w-[100%]">
          {props.children}
        </div>
      </div>
    </div>
  )
}