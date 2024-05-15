import Navbar from "./components/Navbar";
// import Weather from "./components/Weather";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
        {/* <Route exact path="/" element={<Weather/>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
