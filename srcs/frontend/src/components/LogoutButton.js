import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import axios from 'axios';
import { Button } from './ui/Button';

const LogoutButton = () => {
    const { logout } = useAuth();
    return <Button variant="outline" onClick={logout}>Logout</Button>;
    // const { setAccessToken } = useAuth();
    // const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         await axios.get('/api/auth/logout', { withCredentials: true }); // clears the cookie on backend
    //         setAccessToken(null); // clears access token from context
    //         localStorage.removeItem('accessToken');
    //         navigate('/login');
    //     } catch (err) {
    //         console.error("Logout failed", err);
    //     }
    // };

    // return <Button variant="outline" onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
