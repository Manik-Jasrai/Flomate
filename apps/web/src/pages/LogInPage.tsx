import UserForm from "../components/forms/UserForm";

const LogInPage = () => {
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
        <UserForm>Log In</UserForm>

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