import "./App.css";
import { Route, Routes } from "react-router-dom";
import Draw from "./pages/Draw";
import PhotoEdit from "./pages/PhotoEdit";
function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Draw />} />
      <Route path={"/photoedit"} element={<PhotoEdit />} />
    </Routes>
  );
}

export default App;
