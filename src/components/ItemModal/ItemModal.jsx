import "./ItemModal.css";

function ItemModal({
  activeModal,
  handleCloseModal,
  card,
  handleDeleteCard,
  isLoading,
}) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close modal__close_white"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer_text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            onClick={() => handleDeleteCard(card._id)}
            className="modal__delete-btn"
          >
            {isLoading ? "Deleting..." : "Delete Item"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
