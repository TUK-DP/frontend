import { useLocation, useNavigate } from "react-router-dom";

const DiaryShow = () => {
  const location = useLocation();
  const image = location.state?.imageDataUrl || null;

  return (
    <div>
      {image && (
        <img
          src={image}
          style={{ width: "350px", height: "350px", marginTop: "80px" }}
          alt="Captured"
        />
      )}
    </div>
  );
};
export default DiaryShow;
