import AppBar from "../components/AppBar"
import Hero from "../components/Hero"
import Carousel from "../components/Carousel"

const LandingPage = () => {
  return (
    <div>
        <AppBar />
        <Hero />
        <Carousel />
        <footer className="text-center text-zinc-500 py-8 text-sm">
        © {new Date().getFullYear()} Flomate. Made with ⚡ by Manik Jasrai.
      </footer>
    </div>
  )
}

export default LandingPage