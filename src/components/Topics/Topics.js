import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import "firebase/compat/firestore";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("topics")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setTopics(data);
      });
  }, []);
  return (
    <div>
      {topics.map((m) => {
        return (
          <ul>
            <li key={m.name}>{m.name}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default Topics;
