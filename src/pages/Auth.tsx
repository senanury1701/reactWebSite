import LoginPage from '../components/LogReg/Login';
import RegisterPage from '../components/LogReg/Register';
import React, { useState } from 'react';
import image from '../assets/athpage.png';
import '../css/Auth.css';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-container d-flex justify-content-center align-items-center mx-auto">
            <div className="image-container d-none d-lg-block w-50 text-center">
                <img src={image} alt="Login/Register" />
            </div>
            <div className="form-container p-4">
                {isLogin ? <LoginPage /> : <RegisterPage />}
                <div className="button-group mb-4">
                    {isLogin ? (
                        <p 
                            onClick={() => setIsLogin(false)} 
                            className="toggle-button active"
                        >
                            Don't you have an account?
                        </p>
                    ) : (
                        <p 
                            onClick={() => setIsLogin(true)} 
                            className="toggle-button active"
                        >
                            Do you have an account?
                        </p>
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default Auth;
