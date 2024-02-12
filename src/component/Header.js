import backBtn from "../assets/backBtn.png";

const Header = ({ pageName }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        boxShadow: "0 4px 2px -2px #D9D9D9",
        padding: "15px 15px",
        position: "fixed",
        top: 0,
        width: "380px",
        backgroundColor: "white",
        height: "40px",
      }}
    >
      {pageName !== "Re-Memory" && (
        <img src={backBtn} style={{ marginRight: "-10px" }} />
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
