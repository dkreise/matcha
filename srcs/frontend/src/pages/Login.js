import { useState } from "react";
import { useAuth } from '../services/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleLogin } from "../services/login";
import InputField from "../components/InputField";
import { Button } from "../components/ui/button"

const SignUpLink = () => {
    return (
        <p>
            Don't have an account? <Link to="/signup">Sign Up here</Link>
        </p>
    );
};

const Login = () => {
    const navigate = useNavigate();
    const { accessToken, setAccessToken } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (accessToken) {
        return <Navigate to="/" replace />;
    }

    const resetForm = () => {
        setUsername('');
        setPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await handleLogin(username, password);
        if (res.success) {
            const data = res.data;
            localStorage.setItem('accessToken', data.accessToken);
            setAccessToken(data.accessToken);
            // console.log("Login successful, access token: ", data.accessToken);
            // alert(data.accessToken)
            navigate("/");
        } else {
            alert("Login failed: " + res.message);
            resetForm();
        }
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
                <Button variant="outline" type="submit">Login</Button>
            </form>
            <SignUpLink />
        </div>
    );
};

export default Login;

