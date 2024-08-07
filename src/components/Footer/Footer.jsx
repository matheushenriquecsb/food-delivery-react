import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Escolha entre um menu diversificado com uma variedade detectável de pratos
            elaborado com os melhores ingredientes e conhecimento culinário.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.linkedin_icon} alt="linkedin" />
            <img src={assets.twitter_icon} alt="twitter" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>Sobre nós</li>
            <li>Delivery</li>
            <li>Privacy Police</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Entre em contato</h2>
          <ul>
            <li>719919190098</li>
            <li>tomato@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 Tomato.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
