import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  handleCloseModal,
  handleSubmit,
  handleSwitchToRegister,
}) => {
  const defaultValues = { email: "", password: "" };
  const { values, handleChange } = useForm(defaultValues);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    handleSubmit(values);
  };

  return (
    <div className="login-modal">
      <ModalWithForm
        title="Log In"
        name="login"
        buttonText="Log In"
        handleCloseModal={handleCloseModal}
        handleSubmit={handleFormSubmit}
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
            value={values.email}
            onChange={handleChange}
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
            value={values.password}
            onChange={handleChange}
          />
        </label>
        <button
          type="button"
          className="modal__register-btn"
          onClick={handleSwitchToRegister}
        >
          Or Register
        </button>
      </ModalWithForm>
    </div>
  );
};

export default LoginModal;
