import { type ReactNode } from 'react'

const UserForm = ({children} : {children : ReactNode}) => {
  return (
    <form className="p-6 rounded-xl shadow-md border border-zinc-200 space-y-6">
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
            />
          </div>

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