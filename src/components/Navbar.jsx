// Navbar.jsx
import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import '../styling/Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onSearch, showHomeButton }) => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h1 className="navbar-title">Picgram</h1>
                <p className="navbar-subtitle">View high quality photos</p>
                {showHomeButton && (
                    <div className="home-icon">
                        <Link to="/">
                            <FontAwesomeIcon icon={faHome} size="1x" />
                        </Link>
                    </div>
                )}
                {!showHomeButton && (
                    <div className="search-bar-wrapper">
                        <SearchBar onSearch={onSearch} />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
