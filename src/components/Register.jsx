import { Link } from "react-router-dom";

function Register() {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form">
        <input
          type="text"
          name="name"
          placeholder="Email"
          required
          className="register__input"
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          required
          className="register__input"
        />
        <button type="submit" aria-label="Войти" className="register__submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link element-hover">
          &ensp;Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
