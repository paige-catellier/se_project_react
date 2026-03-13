import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useState } from "react";

const RegisterModal = ({
  isOpen,
  handleCloseModal,
  handleSubmit,
  handleSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div className="register-modal">
      <ModalWithForm
        title="Sign Up"
        name="register"
        buttonText="Next"
        handleCloseModal={handleCloseModal}
        handleSubmit={handleFormSubmit}
        isOpen={isOpen}
      >
        <label className="modal__label">
          Email*
          <input
            type="email"
            name="email"
            id="email"
            className="modal__input modal__input_type_email"
            placeholder="Email"
            required
            minLength="1"
            maxLength="30"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label className="modal__label">
          Password*
          <input
            type="password"
            name="password"
            id="password"
            className="modal__input modal__input_type_password"
            placeholder="Password"
            required
            minLength="1"
            maxLength="30"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label className="modal__label">
          Name
          <input
            type="name"
            name="name"
            id="nameSignUp"
            className="modal__input modal__input_type_name_sign-up"
            placeholder="Name"
            required
            minLength="1"
            maxLength="30"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="modal__label modal__label_type_avatar-url">
          Avatar URL
          <input
            type="url"
            name="avatarUrl"
            id="avatarUrl"
            className="modal__input modal__input_type_avatar-url"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleInputChange}
          />
        </label>
        <button
          type="button"
          className="modal__login-btn"
          onClick={handleSwitchToLogin}
        >
          Or Log In
        </button>
      </ModalWithForm>
    </div>
  );
};

export default RegisterModal;
