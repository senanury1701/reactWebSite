import LoginPage from '../components/LogReg/Login';
import RegisterPage from '../components/LogReg/Register';
import React, { useState, useEffect } from 'react';
import image from '../assets/athpage.png';
import '../css/Auth.css';
import useAppSelector from '/src/hooks/useAppSelector';
import { selectSuccessRegister } from '/src/features/auth/authSelectors';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const successRegister = useAppSelector(selectSuccessRegister);

    useEffect(() => {
        if (successRegister) {
            setIsLogin(true);
            toast.success('Registration completed successfully!', {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    }, [successRegister]);

    
    const toggleLoginRegister = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth-container d-flex justify-content-center align-items-center mx-auto">
            <ToastContainer />
            <div className="image-container d-none d-lg-block w-50 text-center">
                <img src={image} alt="Login/Register" />
            </div>
            
                <div className="form-container p-4">
                    {isLogin ? <LoginPage /> : <RegisterPage />}
                    {!successRegister && (
                    <div className="button-group mb-4 mt-2">
                        {isLogin ? (
                            <p
                                onClick={toggleLoginRegister}
                                className="toggle-button active"
                            >
                                Don't you have an account?
                            </p>
                        ) : (
                            <p
                                onClick={toggleLoginRegister}
                                className="toggle-button active"
                            >
                                Do you have an account?
                            </p>
                        )}
                    </div>
                    )}
                </div>
            
        </div>
    );
}

export default Auth;
