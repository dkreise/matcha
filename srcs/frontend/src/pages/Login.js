import { useState } from "react";
import { handleLogin } from "../services/login";

const InputField = ({ label, type, value, onChange }) => {
    return (
        <div>
            <label>{label}:</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required
            />
        </div>
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
        </div>
    );
};

export default Login;

