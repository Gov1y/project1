import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import './App.scss';

const App = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        setLoading(true); 
        setError(null); 
        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                params: {
                    query: query,
                    per_page: 30, 
                },
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
                },
            });
            setImages(response.data.results);
        } catch (error) {
            setError("Something went wrong while fetching images. Please try again.");
            console.error("Error fetching the images", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Picgram</h1>
                <p>View high quality photos</p>
                <div className="search-bar-wrapper">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </header>

            {loading && (
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            )}
            
            {error && <div className="error">{error}</div>} 

            {!loading && !error && images.length === 0 && (
                <div className="no-results">HD photos, search now!</div>
            )}

            {!loading && images.length > 0 && <ImageGallery images={images} />} 
        </div>
    );
};

export default App;
