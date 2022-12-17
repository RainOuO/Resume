import React from "react";

import "./_message.scss";

const Message = ({ own, messages, showBotquestion, newMessage }) => {
  console.log("newMessage", newMessage);
  return (
    <>
      <div className="message">
        {messages.map((message) =>
          message.userID === 1 ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.content}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}noneName</p>
              <div className="message__recipient">
                <p>
                  {message.content}
                  none
                </p>
              </div>
            </div>
          )
        )}
        {showBotquestion.map((bot) => (
          <>
            <div key={bot.time}>
              <p>{bot.content}</p>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Message;
