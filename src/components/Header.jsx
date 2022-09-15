import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn }) {

  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип"
        className="header__logo"
      />
      <ul className="header__info">
        {loggedIn &&
          <li>
            <p className="header__user-email">wer@ergw.com</p>
          </li>
        }
        <li>
          <Link className="header__navigation element-hover" to="/sign-in">Регистрация</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;