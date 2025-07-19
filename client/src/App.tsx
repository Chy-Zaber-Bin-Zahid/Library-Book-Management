import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Delete from "./components/Delete";
import Update from "./components/Update";
import Read from "./components/Read";
import NoPage from "./components/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="add" element={<Add />} />
          <Route path="delete" element={<Delete />} />
          <Route path="update" element={<Update />} />
          <Route path="read" element={<Read />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
