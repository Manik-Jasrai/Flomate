import type { ReactNode } from "react"


const OtherButton = ({children, onClick} : {
    children : ReactNode, onClick : () => void
}) => {
  return (
    <div 
    className="flex px-4 py-2 mx-1 text-zinc-600 text-weight-light cursor-pointer rounded hover:bg-gray-100" 
    onClick={onClick}>
        {children}
    </div>
  )
}

export default OtherButton