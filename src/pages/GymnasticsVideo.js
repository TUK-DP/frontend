import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ShowGymnastics = () => {
  const location = useLocation();
  const src = location.state.src;
  const content = location.state.content;
  return (
    <div className={"flex flex-col justify-center items-center h-full gap-4"}>
      <iframe
        width="90%"
        height="315"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
      ></iframe>
      <p className={"text-xl break-keep px-4 text-center text-blue-600"}>
        효과 : {content}
      </p>
    </div>
  );
};

export default ShowGymnastics;
