import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./Screen/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route path="*" element={<ErrorPage />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
