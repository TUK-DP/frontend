import { useLocation, useNavigate } from "react-router-dom";

const DiaryShow = () => {
  const location = useLocation();
  const image = location.state?.imageDataUrl || null;

  return (
    <div>
      {image && (
        <img
          src={image}
          style={{ width: "100px", height: "100px", marginTop: "80px" }}
          alt="Captured"
        />
      )}
    </div>
  );
};
export default DiaryShow;
