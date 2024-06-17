const MyPageItem = ({ src, text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={"flex flex-row py-5 gap-2.5 items-center border-b-2"}
    >
      <img src={src} width="30" />
      <div className={"text-lg flex-grow"}>{text}</div>
    </div>
  );
};
export default MyPageItem;
