import React from "react";
import { useLocation } from "react-router-dom";
import Image from "../component/ImageDiary/Image.js";
import { useState } from "react";

const PhotoEdit = ({}) => {
  const location = useLocation();
  const images = location.state?.savedImages || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div>
      {images.length > 0 ? (
        images.map((image, index) => (
          <Image
            key={index}
            image={image}
            isSelected={index === selectedImageIndex}
            onSelect={() => handleSelect(index)}
          />
        ))
      ) : (
        <p>No Image</p>
      )}
    </div>
  );
};

export default PhotoEdit;
