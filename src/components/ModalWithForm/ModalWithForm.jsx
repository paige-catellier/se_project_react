import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText = "Add Garment",
  handleCloseModal,
  isOpen,
  handleSubmit,
  children,
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
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
