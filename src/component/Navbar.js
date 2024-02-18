import DiaryIcon from "../assets/DiaryIcon.png";
import HomeIcon from "../assets/HomeIcon.png";
import GameIcon from "../assets/GameIcon.png";
import { Link } from "react-router-dom";

const Navbar = ({}) => {
  return (
    <div
      style={{
        backgroundColor: "#82AAE3",
        minWidth: "393px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        // height: "90px",
        alignItems: "center",
        position: "sticky",
        bottom: "0",
        padding: "12px 0px",
        fontSize: "24px",
      }}
    >
      <Link to="/diary">
        <img src={DiaryIcon} height="62" />
      </Link>
      <Link to="/">
        <img src={HomeIcon} height="62" />
      </Link>
      <Link to="/games">
        <img src={GameIcon} height="62" />
      </Link>
    </div>
  );
};

export default Navbar;
