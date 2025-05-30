import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const PasswordInput = ( {value, onChange, placeholder} ) => {

    const [isShowPassword, setIsShowPassword] = useState(false); 
    
    const toggleShowPassoword = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className='flex items-center bg-transparent border-2 px-5 rounded-lg mb-3'>
            <input value={value} 
            onChange={onChange} 
            type={isShowPassword ? "text" : "password"}
            placeholder={placeholder || "Password"}
            className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
            /> 

            {isShowPassword 
            ? 
            <FaRegEye size={22} className = "text-primary curson-pointer" onClick = {() => toggleShowPassoword()}
            ></FaRegEye> 
            : 
            <FaRegEyeSlash size={22} className = "text-slate-400 curson-pointer" onClick = {() => toggleShowPassoword()}
            ></FaRegEyeSlash>
            }
 
        </div>
    )
}

export default PasswordInput
