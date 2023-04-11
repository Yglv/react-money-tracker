import { ReactElement, useContext, useState } from "react";
import { Context } from "..";
import { isValidEmail, isValidPassword } from "../services/ValidService";

export function LoginForm(): ReactElement {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validEmail, setValidEmail] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<boolean>(true)
  const [validToken, setValidToken] = useState<boolean>(true)
  const [isExist, setIsExist] = useState<boolean>(false)
  const {store} = useContext(Context)

  const RegistrationHandler = async  () => {
    if (!isValidEmail(email) && !isValidPassword(password)) {
      setValidEmail(false)
      setValidPassword(false)
    }
    else if (!isValidEmail(email)) {
      setValidEmail(false)
      setValidPassword(true)
    }
    else if (!isValidPassword(password)) {
      setValidPassword(false)
      setValidEmail(true) 
    }
    else {
      await store.registration(email, password)
      if (store.isExist) {
        setIsExist(true)
      }
      else {
        alert('Подтвердите адрес электронной почты')
      }
      setEmail('')
      setPassword('')
      setValidEmail(true)
      setValidPassword(true)
      window.location.reload()
    }
  }

  const LoginHandler = async () => {
    if (!isValidEmail(email) && !isValidPassword(password)) {
      setValidEmail(false)
      setValidPassword(false)
    }
    else if (!isValidEmail(email)) {
      setValidEmail(false)
      setValidPassword(true)
    }
    else if (!isValidPassword(password)) {
      setValidPassword(false)
      setValidEmail(true) 
    }
    else {
      await store.login(email, password)
      if (!store.isAuth) {
        setValidToken(false)
      }
      setEmail('')
      setPassword('')
      setValidEmail(true)
      setValidPassword(true)
    }

  }

  return (
    <div className="w-full m-[100px]">
      <div className="flex flex-col items-center w-full">
        <p className="text-sm font-sans self-start ml-[110px] font-semibold">Email</p>
        <input 
          type="email"
          value={email} 
          onChange={event => setEmail(event.target.value)}
          placeholder="Введите ваш email..." 
          className={validEmail ? "w-[60%] h-[50px] text-[18px] text-gray-500 border-2 border-sky-500 rounded-[12px] mb-[25px] pl-4 pb-1" : 
            "w-[60%] h-[50px] text-[18px] text-red-500 border-2 border-red-500 rounded-[12px] mb-[25px] pl-4 pb-1"}/>
        <p className="text-sm font-sans self-start ml-[110px] font-semibold">Пароль</p>
        <input 
          type="password"
          minLength={3}
          value={password}  
          onChange={event => setPassword(event.target.value)}
          placeholder="Введите ваш пароль..." 
          className={validPassword ? "w-[60%] h-[50px] text-[18px] text-gray-500 border-2 border-sky-500 rounded-[12px] pl-4 pb-1 mb-[35px]"
            : "w-[60%] h-[50px] text-[18px] text-red-500 border-2 border-red-500 rounded-[12px] pl-4 pb-1 mb-[35px]"} />
        <button 
          onClick={() => LoginHandler()}
          className="bg-sky-500 w-[30%] h-[40px] rounded-[15px] text-white text-[20px] border-white self-center cursor-pointer hover:bg-white hover:border-2 hover:border-sky-500 hover:text-sky-500 m-[15px]">Вход</button>
        <button 
          onClick={() => RegistrationHandler()}
          className="bg-sky-500 w-[30%] h-[40px] rounded-[15px] text-white text-[20px] border-white self-center cursor-pointer hover:bg-white hover:border-2 hover:border-sky-500 hover:text-sky-500">Регистрация</button>
        {!validToken && <p className="mt-[20px] text-red-500 text-[20px] text-center font-sans">Неверно введён логин или пароль</p>}
        {isExist && <p className="mt-[20px] text-red-500 text-[20px] text-center font-sans">Пользователь уже существует</p>}
      </div>
    </div>
  )
}