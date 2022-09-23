import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
const initValues = { password: "", email: "" };

const Register = ({ onRegister, onInfoTooltip }) => {
  const { values, handleChange, errors, isValidForm } = useForm(initValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = values;
    if (!password || !email) return;
    onRegister(password, email)
      .then(() => {
        onInfoTooltip(true);
      })
      .catch((err) => {
        onInfoTooltip(false);
        console.log(err);
      });
  };

  return (
    <section className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="form register__form" noValidate onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            value={values.email}
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="register__input"
          />
          <span className="form__error">{errors.email}</span>
        </label>
        <label>
          <input
            type="password"
            value={values.password}
            name="password"
            placeholder="Пароль"
            required
            onChange={handleChange}
            className="register__input"
          />
          <span className="form__error">{errors.password}</span>
        </label>
        <button type="submit" aria-label="Войти" className={`register__submit ${!isValidForm && "register__submit_disable"}`}>
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link element-hover">
          &ensp;Войти
        </Link>
      </div>
    </section>
  );
};

export default Register;
