import { useState } from "react";
import { useAuth } from '../services/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleSignUp } from "../services/signUp";
import InputField from "../components/InputField";
import { Button } from "../components/ui/Button"

const LoginLink = () => {
    return (
        <div className="mt-4 text-center text-sm">
            Already have an account? <Link to="/login" className="underline underline-offset-4">Login here</Link>
        </div>
    );
};

const SignUp = () => {
    const navigate = useNavigate();
    const { accessToken, setAccessToken } = useAuth();
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (accessToken) {
        return <Navigate to="/" replace />;
    }

    const resetForm = () => {
        setUsername('');
        setFirstName('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await handleSignUp(username, first_name, email, password);
        if (res.success) {
            const data = res.data;
            localStorage.setItem('accessToken', data.accessToken);
            setAccessToken(data.accessToken);
            // console.log("Login successful, access token: ", data.accessToken);
            // alert(data.accessToken)
            navigate("/");
        } else {
            alert("Sign up failed: " + res.message);
            resetForm();
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-xl shadow-md bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6 text-primary">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Username"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    label="First Name"
                    type="text"
                    id="first_name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <InputField
                    label="Email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="w-full">Sign Up</Button>
            </form>
            <LoginLink />
        </div>
    );
};

export default SignUp;