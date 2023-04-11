import { ReactElement } from "react";
import { LoginForm } from "./LoginForm";
import { observer } from 'mobx-react-lite'

function Home():ReactElement {
  return (
    <>
      <div className="w-full h-[100vh] flex">
        <div className="flex flex-col items-center w-[35%] h-full">
          <p className="text-5xl text-sky-500 mt-[100px] text-center">Войдите в свою учётную запись</p>
          <LoginForm/>
        </div>
        <div className="flex w-[65%] h-full bg-sky-500 items-center justify-center ">
          <h1 className="text-8xl text-white font-sans">Money tracker</h1>
        </div>  
      </div>
    </>
  )
}

export default observer(Home)