import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const number = useSelector((state) => state.ex.number);
  return (
    <div className="App">
      <header className="App-header">{number}</header>
    </div>
  );
}

export default App;
