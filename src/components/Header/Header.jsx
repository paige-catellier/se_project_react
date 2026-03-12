import "./Header.css";
import logo from "../../images/logo.svg";
//import Avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  handleSignUpClick,
  handleLogInClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        {" "}
        + Add Clothes
      </button>
      <div className="header__user-container">
        <button
          type="button"
          className="header__signup"
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="header__signin"
          onClick={handleLogInClick}
        >
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
