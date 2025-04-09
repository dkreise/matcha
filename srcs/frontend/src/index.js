import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './services/auth';
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const container = document.getElementById('root');

const App = () => (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                {/* <Route path='/' element={<Home />} /> */}
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

const root = ReactDOM.createRoot(container);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// const AuthContext = createContext(null);
// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             axios.get('/api/me', { headers: { Authorization: token } })
//                 .then(res => setUser(res.data))
//                 .catch(() => localStorage.removeItem('token'));
//         }
//     }, []);
    
//     const login = async (email, password) => {
//         const res = await axios.post('/api/login', { email, password });
//         localStorage.setItem('token', res.data.token);
//         setUser({ email });
//     };
    
//     const logout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//     };
    
//     return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
// };



// const Login = () => {
//     const { login } = useAuth();
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await login('admin@example.com', 'admin123');
//     };
//     return <button onClick={handleSubmit}>Login</button>;
// };
