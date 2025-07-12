import type { ReactNode } from "react"


const PrimaryButton = ({children, onClick} : {
    children : ReactNode, onClick : () => void
}) => {
  return (
    <div
    className="flex flex-col justify-center px-8 py-2 mx-1 bg-amber-600 hover:bg-amber-500 text-white rounded-full cursor-pointer hover:shadow" 
    onClick={onClick}>
        {children}
    </div>
  )
}

export default PrimaryButton