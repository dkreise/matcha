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
import ProfileSettings from './pages/ProfileSettings';
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
                <Route path='/profile/settings' element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
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
