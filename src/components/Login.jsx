import useForm from "../hooks/useForm";
const initValues = { password: "", email: "" };

const Login = ({ onLogin }) => {
  const { values, handleChange, errors } = useForm(initValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = values;
    if (!password || !email) return;
    onLogin(password, email)
      .catch((err) => {
      console.log(err);
      });
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="form login__form" noValidate onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            className="login__input"
          />
          <span className="form__error">{errors.email}</span>
        </label>
        <label>
          <input
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
            placeholder="Пароль"
            required
            className="login__input"
          />
          <span className="form__error">{errors.password}</span>
        </label>
        <button type="submit" aria-label="Войти" className="login__submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
