import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import '../styling/ImageGallery.scss';

const ImageGallery = ({ images }) => {
    const [hoveredImageId, setHoveredImageId] = useState(null);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    if (!images || images.length === 0) {
        return (
            <div className="no-results">
                <i className="fas fa-image-slash"></i> {/* Add an icon */}
                <p>No images found. Try adjusting your search or refreshing.</p>
            </div>
        );
    }

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {images.map((image) => (
                <div
                    key={image.id}
                    className={`image-item ${
                        hoveredImageId && hoveredImageId !== image.id ? 'blurred' : ''
                    }`}
                    onMouseEnter={() => setHoveredImageId(image.id)}
                    onMouseLeave={() => setHoveredImageId(null)}
                >
                    <div className="image-wrapper">
                        <img
                            src={image.urls.small}
                            alt={image.alt_description || 'Image'}
                            loading="lazy"
                        />
                        {hoveredImageId === image.id && (
                            <div className="image-overlay">
                                <p className="image-description">
                                    {image.alt_description || 'Beautiful Image'}
                                </p>
                                {/* Add more details if available, like author */}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </Masonry>
    );
};

export default ImageGallery;
