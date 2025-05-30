import React, { useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import Intro from '../../components/Cards/Intro';

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Plese enter your name.")
            return;
        }

        if (!validateEmail(email)) {
            setError("Plese enter a valid email address.")
            return;
        }

        if (!password) {
            setError("Plese enter the password.")
            return;
        }

        setError("");
        // Then a SignUp API call
        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password,
            });
            if (response.data && response.data.error) {
                setError(response.data.message);
                return;
            }
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate('/news-dashboard');
            }
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) { 
                // HTTP errors (4xx/5xx)
                setError(error.response.data.message);
            }
            else { 
                // unknown errors
                setError("An unexpected error occured. Please try again.");
            }
        }
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="flex items-center justify-center items-stretch mt-28">
                <div className="w-96 border-2 rounded bg-white px-7 py-10">
                    <form onSubmit={handleSignUp}>

                        <h4 className='text-2xl mb-9 font-bold'>SignUp</h4>

                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="input-box"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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

                        <button type="submit" className="btn-primary">SignUp</button>

                        <p className="text-sm text-center mt-4 text-gray-500">Already have an account?{" "}
                            <Link to="/login" className="font-medium text-primary underline">Login</Link>
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

export default SignUp;
