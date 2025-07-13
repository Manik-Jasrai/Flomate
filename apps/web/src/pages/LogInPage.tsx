import { useState, useEffect} from "react";
import { api } from "../api/axios";
import UserForm from "../components/forms/UserForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const LogInPage = () => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();
  const [ , setUser ] = useAuth();

  useEffect(() => {
      setErrMsg('');
  }, [usernameInput, passwordInput])

  const login = async (e : any) => {
    e.preventDefault();
    const username = usernameInput;
    const password = passwordInput;

    try{

      const result = await api.post('/auth/login',{
        username,password
      });
      setErrMsg("");
      const token = result.data.accessToken
      // Save token
      setUser({username, token});
      // Navigate to Dashboard
      navigate('/dashboard');
    } catch(err : any) {
      if (err.response.data) {
        setErrMsg(err.response.data)
      } else {
        setErrMsg("Registration Failed");
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 font-mono text-zinc-900">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-amber-600">Welcome Back 👋</h1>
          <p className="mt-2 text-zinc-600 text-sm">
            Ready to automate? Log in and take control of your workflows with Flomate.
          </p>
        </div>

        {/* Login Form */}
        <UserForm
          usernameInput = {usernameInput}
          setUsernameInput={setUsernameInput}
          passwordInput= {passwordInput}
          setPasswordInput={setPasswordInput}
          errMsg={errMsg}
          onSubmit={login}
        >
          Log In
        </UserForm>

        {/* Footer Text */}
        <p className="text-center text-zinc-500 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-amber-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LogInPage