import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
import Homepage from "./pages/HomePage";
import Chatbot from "./pages/Chatbot";
import ChatPage from "./components/ChatPage/ChatPage";
// import Home from "./pages/Homes";

import socketIO from "socket.io-client";
import "./styles/style.scss";
const socket = socketIO.connect("http://localhost:3002");

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="Chatbot" element={<Chatbot />} />
        <Route path="/" element={<Homepage socket={socket} />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
