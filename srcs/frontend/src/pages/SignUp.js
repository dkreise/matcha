import { useState } from "react";
import { useAuth } from '../services/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleSignUp } from "../services/signUp";
import InputField from "../components/InputField";

const LoginLink = () => {
    return (
        <p>
            Already have an account? <Link to="/login">Login here</Link>
        </p>
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
        <div style={{ maxWidth: "300px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    label="First Name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            <LoginLink />
        </div>
    );
};

export default SignUp;