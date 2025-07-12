import UserForm from "../components/forms/UserForm";

const SignUpPage = () => {
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
        <UserForm>Create Account</UserForm>

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