import { useRecoilState } from "recoil"
import { authState } from "../atoms/auth"
import { useDebugValue } from "react";

const useAuth = () => {
    const [ user , setUser] = useRecoilState(authState);
    useDebugValue(user, user => user?.token ? "Logged In" : "Logged Out");
    return [user, setUser] as const;
}

export default useAuth;