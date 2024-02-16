import backBtn from "../assets/backBtn.png";

const Header = ({ pageName }) => {
  return (
    <div
      style={{
        minWidth: "393px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        boxShadow: "0 4px 2px -2px #D9D9D9",
        // height: "70px",
        backgroundColor: "white",
        position: "sticky",
        top: "0",
        padding: "20px 0px",
      }}
    >
      {pageName !== "Re-Memory" && (
        <img src={backBtn} style={{ marginLeft: "15px" }} />
      )}
      <div
        style={{
          fontSize: "25px",
          flexGrow: "1",
          textAlign: "center",
          marginRight: "40px",
        }}
      >
        {pageName}
      </div>
    </div>
  );
};

export default Header;
