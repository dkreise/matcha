import { Link } from 'react-router-dom';

const Home = () => {
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
    </>;
  };
  
  export default Home;