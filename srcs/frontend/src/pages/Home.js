const Home = () => {
  function handleClick() {
    alert('You clicked me!');
  }

  return <>
    <h1>Home</h1>
      <button onClick={handleClick}>Click me</button>
    </>;
  };
  
  export default Home;