import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header() {

  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип"
        className="header__logo"
      />
      <div className="header__info">
        <p className="header__user-email">wer@ergw.com</p>
        <Link className="header__navigation element-hover" to="/sign-in">Регистрация</Link>
      </div>
    </header>
  );
}

export default Header;