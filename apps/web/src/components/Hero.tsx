import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const Hero = () => {
  const navigate = useNavigate();
  const [user] = useAuth();
  const handleGetStarted = () => {
    if (!!user?.token) {
      console.log("logged in")
      navigate('/dashboard');
    } else {
      console.log("logged out")
      navigate('/signup');
    }
  }

  return (
    <section className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-amber-600 bg-clip-text text-transparent">
          Build. Automate. Scale.
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
          Flomate connects your tools and automates tasks with nerdy precision — so you can focus on shipping.
        </p>
        <button onClick = {handleGetStarted} className="bg-amber-600 hover:bg-amber-500 px-6 py-3 rounded-xl text-white font-semibold shadow-sm">
          Get Started
        </button>
      </section>
  )
}

export default Hero