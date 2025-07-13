import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"
import Me from "./pages/Me"
import Dashboard from "./pages/Dashboard"
import AppBar from "./components/AppBar"
import Flow from "./pages/Flow"
import NewFlow from "./pages/NewFlow"

function App() {

  return (
    <>
    <AppBar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/me" element={<Me />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/newFlow" element={<NewFlow />} />
      <Route path="/dashboard/flow/:flowId" element={<Flow />} />

    </Routes>
    </>
  )
}

export default App
