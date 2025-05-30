import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import AddEditNotes from '../Notes/AddEditNotes';
import Toast from '../../components/ToastMessage/Toast';
import { FaArrowLeft } from 'react-icons/fa6';

const renderParagraphsFromText = (text) => {
    if (!text) {
        return (
            <p className="mb-4 text-gray-500 text-base leading-relaxed tracking-tight font-medium">
                Unable to fetch article content. Please try again later.
            </p>
        );
    }
    return text.split('\n\n').map((para, index) => (
        <p key={index} className="mb-4 text-gray-800 text-base leading-relaxed tracking-tight font-medium">
            {para}
        </p>
    ));
};

const Article = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const article = location.state?.article;

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

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    const getAllNotes = () => {
        // This function is required by AddEditNotes but not needed in this context
        // as we're only adding notes, not displaying them
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    if (!article) {
        return (
            <>
                <Navbar userInfo={userInfo} onSearchNote={null} handleClearSearch={null} />
                <div className="px-5 my-2">
                    <p className="text-gray-500">No article data available</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={null} handleClearSearch={null} />
            <button 
                onClick={() => navigate('/news-dashboard')}
                className="fixed top-18 left-2 w-20 h-10 rounded-md bg-transparent text-black flex items-center justify-center flex gap-1">
                <FaArrowLeft className=''/>Back
            </button>
            <div className="px-5 my-2">
                <div className="max-w-7xl mx-auto">
                    <div className='flex items-start gap-8'>
                        {/* Article Section */}
                        <div className="flex-1">
                            <div className="prose max-w-none mt-11 ml-8">
                                <h1 className="text-2xl font-bold text-gray-800">{article.headline}</h1>
                                <div className="flex gap-2 mt-2">
                                    <span 
                                        className="inline-block text-[12px] px-2 py-1 bg-gray-100 text-black rounded capitalize"
                                    >
                                        {article.genre}
                                    </span>
                                    <a 
                                        href={article.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-block text-[11px] px-2 py-1 bg-gray-900 text-white rounded transition-colors"
                                    >
                                        Original Article
                                    </a>
                                </div>
                                <div className="text-gray-600 leading-relaxed mt-5 font-wsans">
                                    {renderParagraphsFromText(article.article)}
                                </div>
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="w-[450px] bg-[#fdfeff] p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Note</h2>
                            <div className="notes-form">
                                <AddEditNotes 
                                    type="add"
                                    noteData={null}
                                    getAllNotes={getAllNotes}
                                    showToastMessage={showToastMessage}
                                    hideCloseButton={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toast 
                isShown={showToast} 
                message={toastMessage} 
                type="add" 
                onClose={handleCloseToast} 
            />
            <button 
                onClick={() => navigate('/my-notes')}
                className="fixed bottom-8 right-8 w-20 h-10 rounded-md bg-black text-white flex items-center justify-center shadow-lg">
                Notes
            </button>
        </>
    );
};

export default Article;
