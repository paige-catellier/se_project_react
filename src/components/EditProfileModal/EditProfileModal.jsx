import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const EditProfileModal = ({ isOpen, handleCloseModal, handleSubmit }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      buttonText="Save Changes"
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input modal__input_type_name"
          required
          minLength="1"
          maxLength="30"
          defaultValue={currentUser ? currentUser.name : ""}
        />
      </label>
      <label className="modal__label">
        Avatar
        <input
          type="url"
          name="avatar"
          id="avatar"
          className="modal__input modal__input_type_avatar"
          required
          defaultValue={currentUser ? currentUser.avatar : ""}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
