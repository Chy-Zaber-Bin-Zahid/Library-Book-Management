import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Toast from "./components/Toast";

function App() {
  return (
    <BrowserRouter>
      <Toast/>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
