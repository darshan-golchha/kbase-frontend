import axios from '../api/axios';
import useAuth from './useAuth';


const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${auth.jwtToken}`, // Include the JWT token in the Authorization header
            },
          });
        console.log(response);
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.jwtToken);
            return { ...prev, jwtToken: response.data.jwtToken }
        });
        return response.data.jwtToken;
    }
    return refresh;
};

export default useRefreshToken;