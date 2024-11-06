import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUpload, faSignInAlt, faUserPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import '../styling/SearchBar.scss';

const SearchBar = ({ onSearch, onImageUpload }) => {
    const [query, setQuery] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query); // Call the search function
            navigate('/'); // Redirect to the homepage
            setQuery(''); // Clear the search input
        } else if (imageFile) {
            onImageUpload(imageFile);
            setImageFile(null);
        }
    };

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <div className="search-bar-container">
            <div className="website-name">PICGRAM</div>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for stunning images..."
                    className="search-input"
                />
                <label type="submit" className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </label>

                <div className="upload-container">
                    <label htmlFor="file-upload" className="upload-button-label">
                        <FontAwesomeIcon icon={faUpload} />
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleImageUpload}
                        className="image-upload"
                        accept="image/*"
                    />
                </div>

                <div className="auth-buttons">
                    <label className="auth-button" onClick={() => {navigate('/')}}>
                        <FontAwesomeIcon icon={faHome} />
                    </label>
                    <label className="auth-button" onClick={() => {navigate('/login')}}>
                        <FontAwesomeIcon icon={faSignInAlt} />
                    </label>
                    <label className="auth-button" onClick={() => {navigate('/register')}}>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
