import DiaryIcon from "../assets/DiaryIcon.png";
import HomeIcon from "../assets/HomeIcon.png";
import GameIcon from "../assets/GameIcon.png";

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
      <img src={DiaryIcon} height="62" />
      <img src={HomeIcon} height="62" onClick={() => onIconClick("home")} />
      <img src={GameIcon} height="62" onClick={() => onIconClick("games")} />
    </div>
  );
};

export default Navbar;
