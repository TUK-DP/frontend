import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../component/ImageDiary/Image.js";
import html2canvas from "html2canvas";
import Button from "../component/Button.js";

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
      <div className={"border-4 border-[#D9D9D9] my-10 p-1"}>
        <div
          id="limit"
          style={{
            width: "350px",
            height: "350px",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
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
      </div>
      <Button width="350px" height="50px" text="완료" onClick={captureImage} />
    </div>
  );
};

export default PhotoEdit;
