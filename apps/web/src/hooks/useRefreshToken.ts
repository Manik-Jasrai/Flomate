import { api } from "../api/axios";
import useAuth from "./useAuth"

const useRefreshToken = () => {

    const [, setUser] = useAuth();

    const refresh = async () => {
        const response = await api.get('/auth/refresh');
        const token = response.data.accessToken;
        
        setUser(prev => ({...prev, token}));
        return token;
    }

    return refresh;
}

export default useRefreshToken