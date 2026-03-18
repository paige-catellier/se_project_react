import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({
  isOpen,
  handleCloseModal,
  handleSubmit,
  handleSwitchToLogin,
}) => {
  const defaultValues = { email: "", password: "", name: "", avatar: "" };
  const { values, handleChange } = useForm(defaultValues);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(values);
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
            value={values.email}
            onChange={handleChange}
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
            value={values.password}
            onChange={handleChange}
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
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label className="modal__label modal__label_type_avatar-url">
          Avatar URL
          <input
            type="url"
            name="avatar"
            id="avatar"
            className="modal__input modal__input_type_avatar-url"
            placeholder="Avatar URL"
            value={values.avatar}
            onChange={handleChange}
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
