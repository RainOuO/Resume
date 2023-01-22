import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
import Homepage from "./pages/HomePage";
import ChatPage from "./components/ChatPage/ChatPage";
// import Home from "./pages/Homes";
import PDFContent from "./components/PDF/PDFContent";
import Signin from "./pages/Signin";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import PostInfo from "./pages/PostInfo";
import socketIO from "socket.io-client";
import "./styles/style.scss";
import { useEffect, useState } from "react";
import firebase from "./utils/firebase";

const socket = socketIO.connect("http://localhost:3002");

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);
  console.log("HEADER USER的ID", user);
  return (
    <div className="app">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        {/* <Route path="/" element={<Homepage socket={socket} />}></Route> */}
        {/* <Route path="/chat" element={<ChatPage socket={socket} />}></Route> */}
        {/* <Route path="/" element={<PDFContent socket={socket} />}></Route> */}
        <Route path="/" element={<Post socket={socket} user={user} />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/new-post" element={<NewPost />}></Route>
        <Route path="/post/:postId" element={<PostInfo user={user} />}></Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
