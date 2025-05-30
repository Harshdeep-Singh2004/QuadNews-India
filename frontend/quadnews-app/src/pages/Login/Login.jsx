import React, { useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import Intro from '../../components/Cards/Intro';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Plese enter a valid email address.")
            return;
        }
        if (!password) {
            setError("Plese enter the password.")
            return;
        }
        setError("");
        // Then a Login API call
        try {
            const response = await axiosInstance.post("/login", {
                // both email and password are fetched the user's login request
                // user data is sent to the server' side
                // data sent !!!
                email: email,
                password: password,
            });
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate('/news-dashboard');
            }
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); // for error-400
            }
            else {
                setError("An unexpected error occured. Please try again.");
            }
        }
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="flex items-center justify-center items-stretch mt-28">
                <div className="w-96 border-2 rounded bg-white px-7 py-10">
                    <form onSubmit={handleLogin}>

                        <h4 className="text-2xl mb-9 font-bold">Welcome Back!</h4>

                        <input 
                            type="text" 
                            placeholder="Email address" 
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></PasswordInput>

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type="submit" className="btn-primary">Login</button>

                        <p className="text-sm text-center mt-4 text-gray-500">Not registered yet?{" "}
                            <Link to="/signUp" className="font-medium text-primary underline"> Create an Account</Link>
                        </p>

                    </form>
                </div>
                <div className="w-96 rounded bg-[#f5f5f5] flex items-center justify-center">
                    <Intro></Intro>
                </div>
            </div>
        </>
    )
}

export default Login;
