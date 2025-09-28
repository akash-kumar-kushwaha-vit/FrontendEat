import React, { useContext, useEffect, useState } from 'react'
import './loginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

export default function LoginPopup({ setShowLogin }) {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
        // Clear error when user starts typing
        if (error) setError("");
    }

    const onLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            let newUrl = url;
            if (currState === "Login") {
                newUrl += '/api/user/login';
            } else {
                newUrl += '/api/user/register';
            }
            
            const response = await axios.post(newUrl, data);
            
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    // Close popup when clicking outside
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            setShowLogin(false);
        }
    }

    // Close popup on ESC key
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.keyCode === 27) {
                setShowLogin(false);
            }
        };
        
        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, []);

    return (
        <div className='login-popup' onClick={handleOverlayClick}>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img 
                        onClick={() => setShowLogin(false)} 
                        src={assets.cross_icon} 
                        alt="Close" 
                    />
                </div>
                
                {error && (
                    <div className="error-message" style={{
                        color: '#dc3545',
                        backgroundColor: '#f8d7da',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '15px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}
                
                <div className="login-popup-inp">
                    {currState === "Sing Up" && (
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder='Your name' 
                            required 
                            disabled={isLoading}
                        />
                    )}
                   
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder='Your email' 
                        required 
                        disabled={isLoading}
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Password' 
                        required 
                        disabled={isLoading}
                    />
                </div>
                
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Loading...' : currState === "Sing Up" ? "Create account" : "Login"}
                </button>
                
                <div className='login-popup-condition'>
                    <input type="checkbox" required disabled={isLoading} />
                    <p>By continuing, I agree to the terms of use and privacy policy.</p>
                </div>
                
                {currState === "Login" ? (
                    <p>Create New account? <span onClick={() => {setCurrState("Sing Up"); setError("");}}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => {setCurrState("Login"); setError("");}}>Login here</span></p>
                )}
            </form>
        </div>
    )
}