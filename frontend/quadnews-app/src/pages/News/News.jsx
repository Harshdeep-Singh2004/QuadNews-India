import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NewsCard from '../../components/Cards/NewsCard';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const News = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/get-user');
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    };


    useEffect(() => {
        const refreshTimer = setTimeout(() => {
            window.location.reload();
        }, 30 * 60 * 1000);
        return () => clearTimeout(refreshTimer);
    }, []);

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={null} handleClearSearch={null} />

            <div className="px-5 my-2 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
                    <NewsCard genre="technology"></NewsCard>
                    <NewsCard genre="trending"></NewsCard>
                    <NewsCard genre="sports"></NewsCard>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
                    <NewsCard genre="business"></NewsCard>
                    <NewsCard genre="entertainment"></NewsCard>
                </div>
            </div>

            <button 
                onClick={() => navigate('/my-notes')}
                className="fixed bottom-8 right-8 w-20 h-10 rounded-md bg-primary text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg">
                Notes
            </button>
        </>
    );
};

export default News;
