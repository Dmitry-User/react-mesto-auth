import { Link, Route, Switch } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = ({ emailUser, onLogout }) => {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <ul className="header__nav">
        <Switch>
          <Route exact path="/">
            <li>
              <p className="header__email">{emailUser}</p>
            </li>
            <li>
              <button
                type="button"
                onClick={onLogout}
                className="header__button element-hover"
              >
                Выйти
              </button>
            </li>
          </Route>
          <Route path="/sign-up">
            <li>
              <Link to="/sign-in" className="header__nav-link element-hover">
                Войти
              </Link>
            </li>
          </Route>
          <Route path="/sign-in">
            <li>
              <Link to="/sign-up" className="header__nav-link element-hover">
                Регистрация
              </Link>
            </li>
          </Route>
        </Switch>
      </ul>
    </header>
  );
};

export default Header;
