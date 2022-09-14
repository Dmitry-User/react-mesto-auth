import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, buttonText }) {
  const { values, setValues, handleChange, errors, isValidForm, resetForm } = useForm({ name: "", link: "" });

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", link: "" });
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValidForm={isValidForm}
      buttonText={buttonText}
    >
      <label className="popup__label">
        <input
          type="text"
          value={values.name}
          onChange={handleChange}
          name="name"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          required
          className="popup__input"
        />
        <span className="popup__error">{errors.name}</span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          value={values.link}
          onChange={handleChange}
          name="link"
          placeholder="Ссылка на фото"
          required
          className="popup__input"
        />
        <span className="popup__error">{errors.link}</span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
