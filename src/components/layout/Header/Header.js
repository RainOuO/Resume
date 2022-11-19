import logobody from "../../../images/logo_dog_body1.svg";
import { FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";

import "./_Header.scss";

const Header = () => {
  const AuthBtn = () => {
    return (
      <div className="header_Icon_user">
        <FaUser />
      </div>
    );
  };

  return (
    <div className="header_main_body fixed-top">
      <div className="header_main d-flex justify-content-between position-relative">
        <Link to="/" className="d-block header_menu">
          <img className=" header_dog-logo " src={logobody} alt="dog" />
        </Link>
        <div className="d-flex header_Icon align-items-center justify-content-end ">
          <AuthBtn />
        </div>
      </div>
    </div>
  );
};
export default Header;
