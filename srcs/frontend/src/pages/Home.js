import { Link } from 'react-router-dom';
import { useAuth } from '../services/auth';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
    const { accessToken } = useAuth();

    function handleClick() {
        alert('You clicked me!');
    }

    return <>
        <h1>Home</h1>
        <button onClick={handleClick}>Click me</button>
        <br></br>
        <Link to="/login">Login</Link>
        <br></br>
        <Link to="/signup">Sign Up</Link>
        <br></br>
        <LogoutButton />
    </>;
};
  
export default Home;