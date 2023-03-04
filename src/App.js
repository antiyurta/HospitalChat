import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import { Route, Routes } from 'react-router-dom';
import Main from "./components/pages/Layout/Main";
import Home from './components/pages/Home';
import Login from './components/Login';
import PrivateRoute from "./features/PrivateRoute";
import NotPermission from './components/NotPermission';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notPermission" element={<NotPermission />} />
        <Route element={<Main />}>
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
