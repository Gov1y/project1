import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar'; // You can keep this if needed
import ImageGallery from './components/ImageGallery';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import SearchBar from './components/SearchBar'; // Import SearchBar
import './App.scss';

const AppContent = ({ handleSearch, images, loading, error, searchTerm }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div className="App">
            <SearchBar onSearch={handleSearch} isAuthPage={isAuthPage} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            {loading && (
                                <div className="loader-wrapper">
                                    <div className="loader"></div>
                                </div>
                            )}
                            {error && <div className="error">{error}</div>}
                            {!loading && !error && images.length === 0 && (
                                <div className="no-results">HD photos, search now!</div>
                            )}
                            {!loading && images.length > 0 && (
                                <div className="results-message" style={{ marginTop: '20px' }}>
                                    Showing results based on: <strong>{searchTerm}</strong>
                                </div>
                            )}
                            {!loading && images.length > 0 && <ImageGallery images={images} />}
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
            </Routes>
        </div>
    );
};

const App = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        setSearchTerm(query);
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
        <Router>
            <AppContent
                handleSearch={handleSearch}
                images={images}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
            />
        </Router>
    );
};

export default App;
