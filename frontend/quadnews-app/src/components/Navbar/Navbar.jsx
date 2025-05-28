import React, {useState} from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear()
        navigate('/login');
    };

    const handleSearch = () => {
        if (searchQuery && onSearchNote) {
            onSearchNote(searchQuery);
        }
    }

    const onClearSearch = () => {
        setSearchQuery("");
        if (handleClearSearch) {
            handleClearSearch();
        }
    }

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-3xl font-bold font-raleway py-2'>
                <span className='text-primary'>Quad</span>
                <span>News</span>
            </h2>

            {userInfo && onSearchNote && (
                <SearchBar 
                    value={searchQuery} 
                    onChange={({target}) => {setSearchQuery(target.value)}}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
            )}

            <ProfileInfo userInfo={userInfo} onLogout={onLogout}></ProfileInfo>
        </div>
    )
}

export default Navbar
