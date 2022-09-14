import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
  buttonText,
}) {
  const refValue = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: refValue.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValidForm={true}
      buttonText={buttonText}
    >
      <label className="popup__label">
        <input
          ref={refValue}
          type="url"
          name="avatar"
          placeholder="Ссылка на фото"
          required
          className="popup__input"
        />
        <span className="popup__error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
