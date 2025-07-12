import OtherButton from "./buttons/OtherButton"
import PrimaryButton from "./buttons/PrimaryButton"

const AppBar = () => {
  return (
    <nav className="flex px-6 py-4 border-b items-center justify-between ">
        {/*Logo*/}
        <div className="text-2xl font-mono font-black tracking-wide text-amber-600">
            Flomate<span className="text-amber-400">()</span>
        </div>
        {/*Buttons*/}
        <div className="flex">
            <OtherButton onClick={() => console.log("Login")}>Log In </OtherButton>
            <PrimaryButton onClick={() => console.log("Sign Up")}>Sign Up</PrimaryButton>
        </div>
    </nav>
  )
} 

export default AppBar