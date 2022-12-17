import React, { useState, useEffect } from "react";
import Message from "../../components/message/Message";
import reactlogo from "../../images/logo192.png";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import "./_Chatbot.scss";

const Chatbot = () => {
  const [showBotquestion, setShowBotquestion] = useState([]);
  console.log("showBotquestion", showBotquestion);
  const [botsocket, setBotsocket] = useState(null);
  console.log("不重要ㄉ", botsocket);
  const [inputmessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatbot, setChatbot] = useState(false);
  const [socket, setSocket] = useState(null);
  let senderID = 1;
  function handleSumbit(e) {
    e.preventDefault();
    socket.emit("chatmessage", inputmessage);
    if (messages.content === "蘋果") {
      console.log("是蘋果");
    } else {
      console.log("香蕉你的巴辣");
    }
    setInputMessage("");
  }

  useEffect(() => {
    let ws = io("http://localhost:3002");
    setSocket(ws);
    ws.on("chat", (msg) => {
      setMessages(function (prevState, props) {
        return [...prevState, { userID: 1, dt: Date.now(), content: msg }];
      });
    });
  }, []);

  //!
  useEffect(() => {
    let botws = io("http://localhost:3002");
    setBotsocket(botws);
    botws.on("BotChatroom", (msg) => {
      console.log("來前端機器人的訊息", msg);
      setShowBotquestion(function (prevState, props) {
        return [...prevState, { id: uuidv4(), content: msg }];
      });
    });
  }, []);
  //!
  return (
    <>
      <div className="messenger">
        {/* <div className="chatMenu"></div>
        <div className="chatBox"></div>
        <div className="chatOnline"></div> */}

        {/* 關閉畫面 */}
        {chatbot === false ? (
          <div
            className=" d-wrap h-hotline"
            onClick={() => setChatbot(!chatbot)}
          >
            <div className="chat-icon"></div>
          </div>
        ) : (
          ""
        )}
        {chatbot === true ? (
          <div>
            <div className="wrap">
              <div
                className="closebtn"
                role="button"
                onClick={() => setChatbot(false)}
              >
                <i className="icon icon-close"></i>
              </div>
              <div className="wrap-open">
                <div className="ember-view">
                  <div className="home-content">
                    <div className="header">
                      <div className="title">
                        <div className="logo">
                          <img src={reactlogo} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="body-sections">
                      <div className="dummy-bar soild">
                        <div className="card-layout scroll-section"></div>
                      </div>
                      <Message
                        own={senderID === 1}
                        messages={messages}
                        showBotquestion={showBotquestion}
                      />
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="請輸入"
                        type="text"
                        id="name"
                        name="name"
                        value={inputmessage}
                        onChange={(e) => {
                          setInputMessage(e.target.value);
                        }}
                      ></textarea>
                      <button
                        className="chatSumnitButton"
                        onClick={handleSumbit}
                      >
                        傳送
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Chatbot;
