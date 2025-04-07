// LogoutButton.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import axios from 'axios';

const LogoutButton = () => {
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout', { withCredentials: true }); // clears the cookie on backend
            setAccessToken(null); // clears access token from context
            navigate('/login');
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
