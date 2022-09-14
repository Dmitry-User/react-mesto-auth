import Popup from "./Popup";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  isLoading,
  isValidForm,
  buttonText
}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      children={children}
      background="light"
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close element-hover"
          aria-label="Закрыть"
        />
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          onSubmit={onSubmit}
          noValidate
          className="form popup__form"
        >
          {children}
          <button
            type="submit"
            disabled={isLoading}
            className={`popup__submit ${!isValidForm && "popup__submit_disable"}`}
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
