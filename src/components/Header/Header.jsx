import "./Header.css";
import logo from "../../images/logo.svg";
import { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { NavLink } from "react-router-dom";
import Avatar from "../../images/avatar.png";

function Header({
  handleAddClick,
  weatherData,
  handleSignUpClick,
  handleLogInClick,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <header className="header">
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </NavLink>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />
        {currentUser && isLoggedIn ? (
          <div className="header__avatar-container">
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              {" "}
              + Add Clothes
            </button>
            <NavLink to="/profile" className="header__user-info">
              <p className="header__username">Terrance Tegegne</p>
              <img
                src={Avatar}
                alt="Terrance Tegegne"
                className="header__avatar"
              />
            </NavLink>
          </div>
        ) : (
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
              Log In
            </button>
          </div>
        )}
      </header>
    </CurrentUserContext.Provider>
  );
}

export default Header;
