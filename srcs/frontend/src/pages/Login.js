import { useState } from "react";
import { Link } from 'react-router-dom';
import { handleLogin } from "../services/login";
import InputField from "../components/InputField";

const SignUpLink = () => {
    return (
        <p>
            Don't have an account? <Link to="/signup">Register here</Link>
        </p>
    );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(username, password);
    };

    return (
        <div style={{ maxWidth: "300px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <SignUpLink />
        </div>
    );
};

export default Login;

