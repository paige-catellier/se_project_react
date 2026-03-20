import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, handleCloseModal, isLoading }) => {
  const defaultValues = { name: "", imageUrl: "", weather: "" };
  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText={isLoading ? "Saving..." : "Add Garment"}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="clothing-name"
          className="modal__input modal__input_type_card-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          id="clothing-link"
          className="modal__input modal__input_type_url"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__fieldset modal__fieldset_type_radio">
        <legend className="modal__legend">Select the weather type:</legend>
        <div>
          <input
            className="modal__radio-button"
            type="radio"
            id="choiceHot"
            name="weather"
            value="hot"
            onChange={handleChange}
          />
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="choiceHot"
          >
            Hot
          </label>
        </div>
        <div>
          <input
            className="modal__radio-button"
            type="radio"
            id="choiceWarm"
            name="weather"
            value="warm"
            onChange={handleChange}
          />
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="choiceWarm"
          >
            Warm
          </label>
        </div>
        <div>
          <input
            className="modal__radio-button"
            type="radio"
            id="choiceCold"
            name="weather"
            value="cold"
            onChange={handleChange}
          />
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="choiceCold"
          >
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
