import React, { useEffect, useState } from "react";
import Topics from "../../components/Topics";
import { useParams } from "react-router-dom";
import firebase from "../../utils/firebase";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";

import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "firebase/compat/storage";
import "./_PostInfo.scss";

const PostInfo = ({ user }) => {
  console.log("PostInfo 內容詳細userid", user);
  const { postId } = useParams();
  const [post, setPost] = useState({ auther: {} });
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      // onSnapshot 更新狀態監聽功能意思 只要postId值有改變 會更新Firestore資料 會馬上取得最新狀態
      .onSnapshot((documentSnapshot) => {
        const data = documentSnapshot.data();
        setPost(data);
      });
  }, []);
  // 處理留言狀態開始
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("createdAt", "desc")
      // 可以做一個選擇留言順序 更新desc
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setComments(data);
      });
  }, []);
  function toggleCollected() {
    const uid = firebase.auth().currentUser.uid;
    if (isCollected) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
          // arrayUnion 是把陣列加進去 不管怎樣舊的值都不會被取代
        });
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
          // arrayUnion 是把陣列加進去 不管怎樣舊的值都不會被取代
        });
    }
  }
  const isCollected = post.collectedBy?.includes(
    firebase.auth().currentUser.uid
  );
  function toggleLiked() {
    const uid = firebase.auth().currentUser.uid;
    if (isLike) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          LikeBy: firebase.firestore.FieldValue.arrayRemove(uid),
          // arrayUnion 是把陣列加進去 不管怎樣舊的值都不會被取代
        });
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          LikeBy: firebase.firestore.FieldValue.arrayUnion(uid),
          // arrayUnion 是把陣列加進去 不管怎樣舊的值都不會被取代
        });
    }
  }
  const isLike = post.LikeBy?.includes(firebase.auth().currentUser.uid);
  async function onSubmit() {
    setIsLoading(true);
    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const postRef = firestore.collection("posts").doc(postId);
    batch.update(postRef, {
      commentsCount: firebase.firestore.FieldValue.increment(1),
      // increment是firestore提供的增加1的function
    });

    const commentRef = postRef.collection("comments").doc();
    batch.set(commentRef, {
      content: commentContent,
      createdAt: firebase.firestore.Timestamp.now(),
      auther: {
        uid: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName || "",
        photoURL: firebase.auth().currentUser.photoURL || "",
      },
    });
    await batch.commit().then(() => {
      setCommentContent("");
      setIsLoading(false);
    });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <Topics />
        </div>
        <div className="col-8">
          <div className="col-2">
            <Link to={`post/${post.id}`}>
              <img className="w-100 " src={post.imageUrl} alt="" />
            </Link>
          </div>
          <div className="col-10">
            <div className="container user_photo">
              <div className="d-flex">
                {post.author?.photoURL ? (
                  <img src={post.author.photoURL} alt="" />
                ) : (
                  <FaUserCircle />
                )}
                {/* 使用者大頭貼記得找出render後無法出現bug */}
                <div className="">
                  <p> {post.displayName || "使用者"}</p>
                </div>
              </div>

              <p>{post.title}</p>
              <p>{post.createdAt?.toDate().toLocaleDateString()}</p>
              <p>{post.content}</p>
              <p className="d-flex">
                留言 {post.commentsCount || 0}
                <div className="" onClick={toggleLiked}>
                  {isLike ? <FcLike /> : <FcLikePlaceholder />}讚
                  {post.LikeBy?.length || 0}
                </div>
                <div className="isCollected" onClick={toggleCollected}>
                  {isCollected ? <BsBookmarkFill /> : <BsBookmark />}
                </div>
              </p>
              <div className="container">
                <div className="row">
                  <form>
                    <textarea
                      value={commentContent}
                      onChange={(e) => {
                        setCommentContent(e.target.value);
                      }}
                      className="col-12"
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                    ></textarea>
                    <button
                      onClick={onSubmit}
                      className={
                        isLoading
                          ? "btn btn-waring m-5 text-light"
                          : // 記得做一個lodaing的特效
                            "btn btn-info col-3 text-start"
                      }
                    >
                      留言
                    </button>
                  </form>
                  <div className="col-12">
                    共 {post.commentsCount || 0} 則留言
                  </div>

                  {comments.map?.((comment) => {
                    return (
                      <>
                        <div className="row">
                          <div className="col-1 ">
                            {comment.author?.photoURL ? (
                              <img
                                className="w-100"
                                src={comment.author.photoURL}
                                alt=""
                              />
                            ) : (
                              <FaUserCircle />
                            )}
                          </div>
                          <div className="col-11 my-auto">
                            {comment.auther.displayName || "使用者"}
                            {comment.createdAt.toDate().toLocaleString() || ""}
                          </div>
                          <div className="col-1"></div>
                          <div className="col-6 text-start">
                            {comment.content || ""}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-2">空白</div> */}
      </div>
    </div>
  );
};

export default PostInfo;
