import DiaryIcon from "../assets/DiaryIcon.png";
import HomeIcon from "../assets/HomeIcon.png";
import GameIcon from "../assets/GameIcon.png";
import { Link } from "react-router-dom";

const Navbar = ({}) => {
  return (
    <div
      style={{
        backgroundColor: "#82AAE3",
        position: "fixed",
        bottom: "0px",
        left: "0px",
        right: "0px",
        margin: "0px auto",
        minWidth: "360px",
        maxWidth: "420px",
        width: "100%",
        height: "90px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: "40",
      }}
    >
      <Link to="/calendar">
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
