import DiaryIcon from "../assets/DiaryIcon.png";
import HomeIcon from "../assets/HomeIcon.png";
import GameIcon from "../assets/GameIcon.png";
import { Link } from "react-router-dom";

const Navbar = ({ onIconClick }) => {
  return (
    <div
      style={{
        backgroundColor: "#82AAE3",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        height: "91px",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        width: "393px",
      }}
    >
      <Link to="/diary">
        <img
          src={DiaryIcon}
          height="62"
          onClick={() => onIconClick("/diary")}
        />
      </Link>
      <Link to="/">
        <img src={HomeIcon} height="62" onClick={() => onIconClick("/")} />
      </Link>
      <Link to="/games">
        <img src={GameIcon} height="62" onClick={() => onIconClick("/games")} />
      </Link>
    </div>
  );
};

export default Navbar;
