import { useState } from "react";
import { useAuth } from '../services/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleLogin } from "../services/login";
import InputField from "../components/InputField";
import { Button } from "../components/ui/Button"

const SignUpLink = () => {
    return (
        <div className="mt-4 text-center text-sm">
            Don't have an account? <Link to="/signup" className="underline underline-offset-4">Sign Up here</Link>
        </div>
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
        <div className="max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-xl shadow-md bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6 text-primary">Login</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Username"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="w-full">Login</Button>
            </form>
            <SignUpLink />
        </div>
    );
};

export default Login;

