import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../component/ImageDiary/Image.js";
import html2canvas from "html2canvas";

const PhotoEdit = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const images = location.state?.savedImages || [];
  const [imageDataUrl, setImageDataUrl] = useState([]);

  useEffect(() => {
    if (imageDataUrl.length > 0) {
      navigate("/diary/show", { state: { imageDataUrl } });
    }
  }, [imageDataUrl]);

  const captureImage = () => {
    const element = document.getElementById("limit");
    html2canvas(element).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      setImageDataUrl(dataUrl);

      console.log("Captured image:", dataUrl);
    });
  };

  return (
    <div>
      <div
        id="limit"
        style={{
          border: "2px solid #D9D9D9",
          marginTop: "80px",
          width: "350px",
          height: "350px",
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => <Image key={index} image={image} />)
        ) : (
          <p>No Image</p>
        )}
      </div>
      <button onClick={captureImage}>완료</button>
    </div>
  );
};

export default PhotoEdit;
