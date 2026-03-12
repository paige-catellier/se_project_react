import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { addItem, getItems, removeItem } from "../../utils/api";
import { coordinates, apiKey } from "../../utils/constants";
import { register, authorize, checkToken } from "../../utils/auth";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLogInClick = () => {
    setActiveModal("login");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteCard = (itemId) => {
    setIsLoading(true);

    removeItem(itemId)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== itemId));
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const onAddItem = (inputValues) => {
    setIsLoading(true);

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        const sortedData = data.sort((a, b) => b._id - a._id);
        setClothingItems(sortedData);
      })
      .catch(console.error);
  }, []);

  const handleRegistration = ({ email, password, name, avatar }) => {
    register({ email, password, name, avatar })
      .then((res) => {
        handleCloseModal();
        handleLogInClick({ email, password });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogIn = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        handleCloseModal();
        setIsLoggedIn(true);
        setCurrentUser(res.user);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleSignUpClick={handleSignUpClick}
            handleLogInClick={handleLogInClick}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleAddClick={handleAddClick}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
          isLoading={isLoading}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseModal={handleCloseModal}
          handleDeleteCard={handleDeleteCard}
          isLoading={isLoading}
        />
        <RegisterModal
          handleSignInClick={handleSignUpClick}
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "register"}
          onSubmit={handleRegistration}
        />
        <LoginModal
          handleLogInClick={handleLogInClick}
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "login"}
          onSubmit={handleLogIn}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
