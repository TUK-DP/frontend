import { useLocation, useNavigate } from "react-router-dom";

const DiaryShow = () => {
  const location = useLocation();
  const image = location.state?.imageDataUrl || null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {image && (
        <img
          src={image}
          style={{
            width: "350px",
            height: "350px",
            margin: "50px auto",
          }}
          alt="Captured"
        />
      )}
    </div>
  );
};
export default DiaryShow;
