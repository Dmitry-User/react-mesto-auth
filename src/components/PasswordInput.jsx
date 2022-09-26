import { useState } from "react";

const PasswordInput = ({ isValue, onChange }) => {
  const [typeInput, setTypeInput] = useState("password");
  const [passIcon, setPassIcon] = useState("pass-icon_type_unvisible");

  const toggleViewPassword = () => {
    if (typeInput === "password") {
      setTypeInput("text");
      setPassIcon("pass-icon_type_visible");
    } else {
      setTypeInput("password");
      setPassIcon("pass-icon_type_unvisible");
    }
  };

  return (
    <>
      <input
        type={typeInput}
        value={isValue}
        name="password"
        placeholder="Пароль"
        required
        onChange={onChange}
        className="pass-input"
      />
      <span className={`pass-icon ${passIcon}`} onClick={toggleViewPassword} />
    </>
  );
};

export default PasswordInput;