import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUpload } from '@fortawesome/free-solid-svg-icons';
import '../styling/SearchBar.scss';

const SearchBar = ({ onSearch, onImageUpload }) => {
    const [query, setQuery] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery('');
        } else if (imageFile) {
            onImageUpload(imageFile);
            setImageFile(null); 
        }
    };

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What's up"
                className="search-input"
            />
            <button type="submit" className="search-button">
                <FontAwesomeIcon icon={faSearch} />
            </button>

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
        </form>
    );
};

export default SearchBar;
