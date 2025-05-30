import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from '../../components/Cards/NoteCard';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import Add_note from '../../assets/images/Add_note.svg';
import noData from '../../assets/images/no_Data.svg';
import { FaArrowLeft } from 'react-icons/fa6';
 
const Notes = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "edit",
        data: null,
    });

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "add",
    });

    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);

    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown:true, data:noteDetails, type:"edit" });
    };

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type
        });
    };

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: "",
        });
    };

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/get-user');
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        }
        catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    };
    
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get('/get-all-notes');
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        }
        catch (error) {
            console.log("An unexpected error occured. Please try again.");
        }
    };

    const deleteNote = async (data) => {
        const noteId = data._id;
        try {
            const response = await axiosInstance.delete("/delete-note/" + noteId);
            if (response.data && !response.data.error) {
                showToastMessage("Note Deleted Successfully", 'delete');
                getAllNotes();
                onClose();
            }
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.log("An unexpected error occured. Please try again.");
            }
        }
    }

    const onSearchNote = async (query) => {
        if (!query) {
            setIsSearch(false);
            getAllNotes();
            return;
        }
        try {
            const response = await axiosInstance.get("/search-notes", {
                params: {query},
            });
            if (response.data && response.data.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
        return () => {};
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}></Navbar>
            <button 
                onClick={() => navigate('/news-dashboard')}
                className="fixed top-18 left-2 w-20 h-10 rounded-md bg-transparent text-primary flex items-center justify-center flex gap-1">
                <FaArrowLeft className=''/>Back
            </button>
            {
                allNotes.length>0 ? (
                    <div className='container mx-auto px-20'>
                        <div className='grid grid-cols-3 gap-4 mt-8'>
                            {allNotes.map((item, index) => (
                                <NoteCard 
                                    key={item._id}
                                    title={item.title}
                                    date={item.createOn} 
                                    content={item.content}
                                    tags={item.tags}
                                    isPinned={item.isPinned}
                                    onEdit={()=>{handleEdit(item)}}
                                    onDelete={()=>{deleteNote(item)}}
                                    onPinNote={()=>{}}
                                />
                            ))}
                        </div>
                    </div>
                ) : (<EmptyCard 
                        imgSrc={isSearch ? noData : Add_note}
                        message={isSearch ? "Oops! No notes found matching your search." : "No notes available."}
                    />)
            }

            <Modal 
                isOpen={openAddEditModal.isShown}
                onRequestClose={()=>{}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel = ""
                className = "w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
            >
                <AddEditNotes 
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {    
                                setOpenAddEditModal({ isShown: false, type:'edit', data: null});
                            }}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            ></Toast>
        </>
    )
}

export default Notes;
