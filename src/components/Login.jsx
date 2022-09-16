function Login() {

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form">
        <input
          type="text"
          name="name"
          placeholder="Email"
          required
          className="login__input"
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          required
          className="login__input"
        />
        <button
          type="submit"
          aria-label="Войти"
          className="login__submit"
        >Войти</button>
      </form>
    </div>
  );
}

export default Login;