import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
  buttonText,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, errors, handleChange, isValidForm, resetForm } = useForm(currentUser);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setValues(currentUser);
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValidForm={isValidForm}
      buttonText={buttonText}
    >
      <label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          className="form__input"
        />
        <span className="form__error">{errors.name}</span>
      </label>
      <label>
        <input
          type="text"
          name="about"
          value={values.about}
          onChange={handleChange}
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          className="form__input"
        />
        <span className="form__error">{errors.about}</span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
