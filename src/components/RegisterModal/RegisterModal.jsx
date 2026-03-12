//style buttons and form

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, handleCloseModal, handleSubmit }) => {
  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText="Next"
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="email"
          className="modal__input modal__input_type_email"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          id="password"
          className="modal__input modal__input_type_password"
          placeholder="Password"
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label className="modal__label">
        Name
        <input
          type="name"
          name="text"
          id="nameSignUp"
          className="modal__input modal__input_type_name_sign-up"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatarUrl"
          id="avatarUrl"
          className="modal__input modal__input_type_avatar-url"
          placeholder="Avatar URL"
          required
        />
      </label>
      <button type="button" className="modal__login-btn">
        Or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
