import { Link } from "react-router-dom";

const InfoBar = ({ isVisible, emailUser, onLogout }) => {
  return (
    <div className={`info-bar ${!isVisible ? "info-bar_hiden" : ""}`}>
      <p className="info-bar__email">{emailUser}</p>
      <Link
        to="/sign-in"
        onClick={onLogout}
        className="info-bar__link element-hover"
      >
        Выйти
      </Link>
    </div>
  );
};

export default InfoBar;