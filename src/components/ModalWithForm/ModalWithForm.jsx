import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText = "Add Garment",
  secondButtonText,
  loadingText = "Saving...",
  handleCloseModal,
  isOpen,
  handleSubmit,
  children,
  isLoading,
  handleSwitch,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={handleSubmit} name={name} className="modal__form">
          {children}
          <button
            type="submit"
            className={`modal__submit modal__submit_${name}`}
            disabled={isLoading}
          >
            {isLoading ? loadingText : buttonText}
          </button>
          {secondButtonText && (
            <button
              type="button"
              className="modal__register-btn"
              onClick={handleSwitch}
            >
              {secondButtonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
