import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <ul className="header__nav">
        {loggedIn && (
          <li>
            <p className="header__nav-email">wer@ergw.com</p>
          </li>
        )}
        <li>
          <Link to="sign-up" className="header__nav-link element-hover">
            Регистрация
          </Link>
        </li>
        {/* <li>
          <Link className="header__nav-link element-hover" to="/">
            Войти
          </Link>
        </li> */}
        <li>
            <Link to="sign-in" className="header__nav-link element-hover">
              Выйти
            </Link>
          </li>
      </ul>
    </header>
  );
}

export default Header;
