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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { addItem, getItems, removeItem } from "../../utils/api";
import { coordinates, apiKey } from "../../utils/constants";
import { register, authorize, checkToken } from "../../utils/auth";
import Footer from "../Footer/Footer";
import CurrentUserContext from "../../contexts/CurrentUserContext";
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

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
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

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error)
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  const handleDeleteCard = (itemId) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    removeItem(itemId, token)
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
    const token = localStorage.getItem("jwt");
    addItem({ ...newCardData, token })
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
        if (res.email) {
          handleLogIn({ email, password });
          handleCloseModal();
        }
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogIn = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          checkToken(res.token).then((res) => {
            setIsLoggedIn(true);
            setCurrentUser(res);
            handleCloseModal();
          });
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");

    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      })
      .finally(() => {
        setIsLoading(false);
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
    <CurrentUserContext.Provider value={currentUser}>
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
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardClick={handleCardLike}
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
                      onEditProfileClick={handleEditProfileClick}
                      onLogOutClick={handleLogOutClick}
                    />
                    <EditProfileModal
                      isOpen={activeModal === "edit-profile"}
                      handleCloseModal={handleCloseModal}
                      handleSubmit={handleEditProfile}
                      isLoading={isLoading}
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
            handleSubmit={handleRegistration}
            handleSwitchToLogin={handleLogInClick}
          />
          <LoginModal
            handleLogInClick={handleLogInClick}
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login"}
            handleSubmit={handleLogIn}
            handleSwitchToRegister={handleSignUpClick}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
