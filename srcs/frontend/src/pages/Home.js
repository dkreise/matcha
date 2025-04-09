import { Link } from 'react-router-dom';
import { useAuth } from '../services/auth';
import LogoutButton from '../components/LogoutButton';
import { Button } from "../components/ui/button"

const Home = () => {
    const { accessToken } = useAuth();

    function handleClick() {
        alert('You clicked me!');
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleClick}>Click me</button>
            <br></br>
            <Button asChild>
                <Link to="/profile">Profile</Link>
            </Button>
            <br></br>
            <Button asChild>
                <Link to="/login">Login</Link>
            </Button>
            <br></br>
            <Button asChild>
                <Link to="/signup">Sign Up</Link>
            </Button>
            <br></br>
            <LogoutButton />
        </div>
    );
};
  
export default Home;