import DiaryIcon from "../assets/DiaryIcon.png";
import HomeIcon from "../assets/HomeIcon.png";
import GameIcon from "../assets/GameIcon.png";
import { Link } from "react-router-dom";
import { BsJournalCheck } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { IoGameControllerOutline } from "react-icons/io5";

const Navbar = ({}) => {
  return (
    <div
      className={
        "min-w-[360px] max-w-[420px] bg-[#82AAE3] fixed bottom-0 left-0 right-0 h-24 mx-auto flex flex-row justify-between items-center pt-1 px-12"
      }
    >
      <Link to="/calendar">
        <div className={"flex flex-col justify-center items-center"}>
          <BsJournalCheck size={50} color="white" style={{ padding: "5px" }} />
          <p className={"text-white text-xl"}>일기장</p>
        </div>
      </Link>
      <Link to="/">
        <div className={"flex flex-col justify-center items-center"}>
          <GoHome size={50} color="white" />
          <p className={"text-white text-xl"}>홈</p>
        </div>
      </Link>
      <Link to="/games">
        <div className={"flex flex-col justify-center items-center"}>
          <IoGameControllerOutline size={50} color="white" />
          <p className={"text-white text-xl"}>게임</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
