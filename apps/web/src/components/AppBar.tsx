import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OtherButton from "./buttons/OtherButton";
import PrimaryButton from "./buttons/PrimaryButton";

const AppBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  const apiPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await apiPrivate.get("/user");
        setUser(prev => ({
          ...prev,
          username: response.data.user.username,
        }));
      } catch (error: any) {
        console.error(error?.response || error);
        setUser({ username: "", token: null }); // Clear on failure
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInStatus();
  }, []);

  const handleLogout = async () => {
    await apiPrivate.get('/auth/logout');
    setUser({ username: "", token: null });
    navigate("/login");
  };

  if (loading) return null;

  return (
    <nav className="flex px-6 py-4 border-b border-zinc-200 items-center justify-between">
      {/* Logo */}
      <div
        className="text-2xl font-mono font-black tracking-wide text-amber-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Flomate<span className="text-amber-400">()</span>
      </div>

      {/* Buttons */}
      {!!user?.token ? (
        <div className="flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 stroke-amber-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span className="text-md text-zinc-700">{user.username}</span>
          <OtherButton onClick={handleLogout}>Log Out</OtherButton>
        </div>
      ) : (
        <div className="flex gap-2">
          <OtherButton onClick={() => navigate("/login")}>Log In</OtherButton>
          <PrimaryButton onClick={() => navigate("/signup")}>Sign Up</PrimaryButton>
        </div>
      )}
    </nav>
  );
};

export default AppBar;
