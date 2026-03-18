import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";

const EditProfileModal = ({ isOpen, handleCloseModal, handleSubmit }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({ name: "", avatar: "" });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      buttonText="Save Changes"
      handleCloseModal={handleCloseModal}
      handleSubmit={handleFormSubmit}
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
          value={values.name}
          onChange={handleChange}
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
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
