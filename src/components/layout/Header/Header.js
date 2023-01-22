import logobody from "../../../images/logo_dog_body1.svg";
import { FaUser } from "react-icons/fa";
import firebase from "../../../utils/firebase";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import "./_Header.scss";

const Header = (userID) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);
  const AuthBtn = () => {
    return (
      <div className="header_Icon_user">
        <FaUser />
      </div>
    );
  };

  return (
    <div className="header_main_body fixed-top">
      <div className="header_main ">
        <div className="row">
          <div className="col-md-4">
            <Link to="/" className="header_menu">
              <h1>Logo</h1>
            </Link>
          </div>
          <div className="col-md-4 my-auto">
            <nav className="">
              <ul className="d-flex my-auto">
                <li className="mx-5">
                  <Link to="" className="">
                    Home
                  </Link>
                </li>
                <li className="mx-5">
                  <Link to="" className="">
                    About
                  </Link>
                </li>
                <li className="mx-5">
                  <Link to="" className="">
                    Skills
                  </Link>
                </li>
                <li className="mx-5">
                  <Link to="" className="">
                    Portfolio
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-4 my-auto">
            <div className="d-flex header_Icon justify-content-end ">
              {user ? (
                <>
                  <Link className="pe-3 my-auto" to="/new-post">
                    發表文章
                  </Link>
                  <div className="user-picture">
                    <img src={localStorage.getItem("profilePicture")} alt="" />
                  </div>
                  <Link className="my-auto ps-3" to="/my">
                    <AuthBtn></AuthBtn>
                  </Link>
                  <Link
                    className="ps-3 my-auto"
                    onClick={() => firebase.auth().signOut()}
                  >
                    登出
                  </Link>
                </>
              ) : (
                <Link to="/signin">註冊/登入</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
