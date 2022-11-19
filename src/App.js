import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./pages/HomePage";
import Chatbot from "./pages/Chatbot";
import "./styles/style.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="Chatbot" element={<Chatbot />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
