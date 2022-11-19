import React from 'react';
import logobody from '../../../images/logo_dog_body1.svg';
import { FiFacebook } from 'react-icons/fi';
import { AiOutlineInstagram } from 'react-icons/ai';
import { RiYoutubeLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import './_Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className=" footer_container container d-flex justify-content-center align-items-center">
        <div className="footer_tittle_logo ">
          <img className="footer_dog" src={logobody} alt="dog" />
        </div>
        <div className="footer_aside">
          <div className=" footer_Icon justify-content-end d-flex align-items-center">
            <Link
              to="https://www.facebook.com/"
              className="footer_Icon_fb  py-2 "
            >
              <FiFacebook />
            </Link>
            <Link
              to="https://www.instagram.com/"
              className="footer_Icon_ig  py-2 "
            >
              <AiOutlineInstagram />
            </Link>
            <Link
              to="https://www.youtube.com/"
              className="footer_Icon_yt  py-2 "
            >
              <RiYoutubeLine />
            </Link>
            <Link
              to="https://mail.google.com/mail/u/0/#inbox"
              className="footer_Icon_mail  py-2 me-0"
            >
              <MdOutlineEmail />
            </Link>
          </div>
          <div className="Footer_allproduct justify-content-end d-flex  ">
            <ul className="my-1 list-unstyled d-flex flex-nowrap nowrap ">
              <Link to="/ec-commodityhomepage" className="footer_product">
                寵物商品
              </Link>
              <Link to="/ec-restauranthomepage" className="footer_product">
                餐廳
              </Link>
              <Link to="/ec-enjoyhomepage" className="footer_product">
                景點&玩樂
              </Link>
              <Link to="/travel" className="footer_product">
                我的行程
              </Link>
              <Link to="/communityHomePage" className="footer_product">
                社群分享
              </Link>
            </ul>
          </div>
          <div className="footer_Copyright justify-content-end d-flex align-items-center ">
            Copyright
            <br className="d-md-none d-block" />
            ©OhDogCat All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
