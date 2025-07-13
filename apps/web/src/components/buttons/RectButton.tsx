import type { ReactNode } from "react"


const RectButton = ({children, onClick} : {
    children : ReactNode, onClick : () => void
}) => {
  return (
    <button
    className="mt-4 bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold"
    onClick={onClick}>
        {children}
    </button>
  )
}

export default RectButton