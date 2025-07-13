
const SmallButton = ({children, onClick} : any) => {
  return (
    <button onClick={onClick}
    className="
        w-8 h-8                               
        flex items-center justify-center
        text-black
        text-2xl
        cursor-pointer
        active:scale-95
        transition
      ">
        {children}
    </button>
  )
}

export default SmallButton