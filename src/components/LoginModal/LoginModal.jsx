import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ isOpen, handleCloseModal, handleSubmit }) => {
  return (
    <div className="login-modal">
      <ModalWithForm
        title="Log In"
        name="login"
        buttonText="Log In"
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
        <label className="modal__label modal__label_type_password">
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
        <button type="button" className="modal__register-btn">
          Or Register
        </button>
      </ModalWithForm>
    </div>
  );
};

export default LoginModal;
