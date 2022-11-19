import React, { useState } from "react";
import reactlogo from "../../images/logo192.png";
import user from "../../images/logo_dog_body1.svg";
import "./_Chatbot.scss";

const Chatbot = () => {
  const [chatbot, setChatbot] = useState(false);
  return (
    <>
      <div className="content">
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
                      <div className="card-layout scroll-section">
                        <div className="channel-title"></div>
                      </div>
                    </div>
                    <div className="container d-flex">
                      <div className="mt-5 ms-5">
                        <img src={user} alt="" />
                      </div>
                      <p className="mt-5 ms-3">hello</p>
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
