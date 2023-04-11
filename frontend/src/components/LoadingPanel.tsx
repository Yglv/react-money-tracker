import { ReactElement } from "react";

export function LoadingPanel(): ReactElement {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <p className="text-4xl text-sky-500 font-sans">Money tracker</p>
    </div>
  )
}