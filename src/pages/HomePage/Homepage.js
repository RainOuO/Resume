import React from "react";
import Chatbot from "../Chatbot";
import "./_homepage.scss";
const Homepage = () => {
  return (
    <>
      <div className="container homeContainer">
        <div className="editor default">
          <div className="main-editor">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            id itaque adipisci magnam, reiciendis temporibus, quis quia magni
            modi nesciunt dolor explicabo at! Eveniet aut impedit nihil
            repudiandae voluptatibus et. Similique voluptatibus ex quos odio
            cupiditate eligendi recusandae tenetur eveniet, ratione ut libero
            nemo iusto. Corporis tempore fuga sint suscipit.
          </div>
          <Chatbot />
        </div>
      </div>
    </>
  );
};

export default Homepage;
