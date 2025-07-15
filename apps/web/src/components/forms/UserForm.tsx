import { type ReactNode, type SetStateAction } from 'react'

interface UserFormParams {
  children : ReactNode,
  usernameInput : string
  setUsernameInput : React.Dispatch<SetStateAction<string>>
  passwordInput : string 
  setPasswordInput : React.Dispatch<SetStateAction<string>>
  errMsg : string
  onSubmit : () => Promise<void>
}

const UserForm = ({
    children, 
    usernameInput, 
    setUsernameInput, 
    passwordInput, 
    setPasswordInput, 
    errMsg, 
    onSubmit} : UserFormParams) => 
  {
  return (
    <form className="p-6 rounded-xl shadow-md border border-zinc-200 space-y-6" onSubmit={(e) => {e.preventDefault();onSubmit();}} method='POST'>
          <div>
            <label htmlFor="username" className="block text-sm text-zinc-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-2 rounded-md text-zinc-900 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="flowdev42"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-zinc-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 rounded-md text-zinc-900 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}

            />
          </div>
          {errMsg && <p className="text-center text-sm text-red-600">{errMsg}</p>}
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-500 text-white py-2 rounded-lg font-semibold transition"
          >
            {children}
          </button>
        </form>
  )
}

export default UserForm