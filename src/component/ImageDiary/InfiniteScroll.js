import React, { useEffect, useRef, useState } from "react";
import diaryController from "../../api/diary.controller";

const InfiniteScroll = ({ isVisible, keyword }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const containerRef = useRef();

  const getPhoto = async () => {
    if (!hasNext) return;
    const res = await diaryController.getKeywordPhotos({
      keyword: keyword,
      page: page,
      pageSize: 5,
    });
    console.log(res.data.result.imgUrls);
    setHasNext(res.data.result.hasNext);
    setData((prev) => [...prev, ...res.data.result.imgUrls]);
  };

  useEffect(() => {
    getPhoto();
  }, [page]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        display: isVisible ? "block" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          width: "100%",
          flexDirection: "row",
          overflowX: "auto",
        }}
        ref={containerRef}
      >
        {data.map((item) => {
          return <img src={item} width={160} height={160} />;
        })}
      </div>
    </div>
  );
};

export default InfiniteScroll;
