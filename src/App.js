import "./App.css";
import "antd/dist/reset.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import NotPermission from "./components/NotPermission";
import ChatDtl from "./components/pages/ChatDtl";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/notPermission" element={<NotPermission />} />
        <Route path="/" element={<Home />} />
        <Route path="/chatDtl" element={<ChatDtl />} />
      </Routes>
    </div>
  );
}

export default App;
