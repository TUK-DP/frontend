import React, { useState, useEffect, useRef } from "react";
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        id="limit"
        style={{
          width: "350px",
          height: "350px",
          border: "4px solid #D9D9D9",
          borderRadius: "40px",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          margin: "50px auto",
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <Image
              key={index}
              image={image.image}
              initialPo={{
                x: (index % 3) * 100,
                y: Math.floor(index / 3) * 100,
              }}
            />
          ))
        ) : (
          <p>No Image</p>
        )}
      </div>
      <button
        onClick={captureImage}
        style={{
          backgroundColor: "#82AAE3",
          borderRadius: "10px",
          border: "none",
          fontSize: "20px",
          fontWeight: "600",
          color: "white",
          width: "350px",
          height: "40px",
        }}
      >
        완료
      </button>
    </div>
  );
};

export default PhotoEdit;
