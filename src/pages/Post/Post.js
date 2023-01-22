import React, { useEffect, useState } from "react";
import Topics from "../../components/Topics";
import { Link } from "react-router-dom";
import firebase from "../../utils/firebase";
import userIcon from "../../images/user.png";
import { FaUserCircle } from "react-icons/fa";
import ChatPage from "../../components/ChatPage/ChatPage";

import photo_backgroung from "../../images/photo_backgroung.jpg";
import "firebase/compat/storage";
import "./_Post.scss";

const Post = ({ socket, user }) => {
  console.log("POST的", user);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Topics />
          </div>
          <div className="col-8">
            {posts.map((post) => {
              return (
                <div key={post.id} className="row">
                  <div className="col-2">
                    <Link to={`post/${post.id}`}>
                      <img
                        className="w-100 "
                        src={post.imageUrl ? post.imageUrl : photo_backgroung}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="col-10">
                    <div className="container user_photo">
                      <div className="d-flex">
                        {post.author.photoURL ? (
                          <img src={post.author.photoURL} alt="" />
                        ) : (
                          <FaUserCircle />
                        )}

                        <div className="">
                          <p> {post.displayName || "使用者"}</p>
                        </div>
                      </div>

                      <p>{post.title}</p>
                      <p>{post.content}</p>
                      <p>
                        留言{post.commentsCount || 0} , 讚
                        {post.LikeBy?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-2">空白</div>
        </div>
      </div>
      <ChatPage socket={socket} />
    </>
  );
};

export default Post;
