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
        return <div className="no-results">No images found</div>;
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
                    className={`image-item ${hoveredImageId && hoveredImageId !== image.id ? 'blurred' : ''}`}
                    onMouseEnter={() => setHoveredImageId(image.id)}
                    onMouseLeave={() => setHoveredImageId(null)}
                >
                    <img src={image.urls.small} alt={image.alt_description || 'Image'} />
                </div>
            ))}
        </Masonry>
    );
};

export default ImageGallery;
