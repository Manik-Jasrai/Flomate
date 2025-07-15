import { useEffect, useState } from "react";
import UserForm from "../components/forms/UserForm";
import { api } from "../api/axios";

const SignUpPage = () => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  
  useEffect(() => {
    setErrMsg('');
  }, [usernameInput, passwordInput])

  const signup = async () => {
    const username = usernameInput;
    const password = passwordInput;

    try{

      const result = await api.post('/auth/register',{
        username,password
      });
      setErrMsg("");
      console.log(result.data)

      // Auto Login
      // Navigate to Dashboard

    } catch(err : any) {
      if (err.response.data.message) {
        setErrMsg(err.response.data.message)
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
          <h1 className="text-4xl font-extrabold text-amber-600">Join Flomate</h1>
          <p className="mt-2 text-zinc-600 text-sm">
            Automate your workflows, connect your tools, and build powerful chains of logic — all in one place.
          </p>
        </div>

        {/* Sign Up Form */}
        <UserForm
          usernameInput = {usernameInput}
          setUsernameInput={setUsernameInput}
          passwordInput= {passwordInput}
          setPasswordInput={setPasswordInput}
          errMsg={errMsg}
          onSubmit={signup}

        >
          Create Account
        </UserForm>

        {/* Footer Text */}
        <p className="text-center text-zinc-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-amber-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage