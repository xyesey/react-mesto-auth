import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { CardContext } from "../contexts/CardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "./Auth/Auth";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ProtectRoute from "./ProtectRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
  });
  const [userEmail, setUserEmail] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);

  const [isEditProfile, setEditProfile] = useState(false);
  const [isAddPlace, setOnAddPlace] = useState(false);
  const [isEditAvatar, setOnEditAvatar] = useState(false);
  const [isDeleteCard, setOnDeleteCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleDeleteClick = (cards) => setOnDeleteCard(cards);
  const handleCardClick = (cards) => setSelectedCard(cards);
  const handleEditProfileClick = () => setEditProfile(true);
  const handleAddPlaceClick = () => setOnAddPlace(true);
  const handleEditAvatarClick = () => setOnEditAvatar(true);

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setLoggedIn(true);
    setUserData(userData);
  };

  const closeModalAuth = () => {
    if (isSuccessModal) {
      setIsSuccessModal(false);
      navigate("/sign-in", { replace: true });
    } else {
      setIsErrorModal(false);
    }
  };

  const handleSignUp = (password, email) => {
    auth
      .register(password, email)
      .then((res) => {
        setIsSuccessModal(true);
      })
      .catch((err) => {
        console.log(err);
        setIsErrorModal(true);
      });
  };

  const handleSignIn = (formValue) => {
    auth
      .authorize(formValue.password, formValue.email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleLogin({ email: res.email });
          navigate("/mesto-react", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsErrorModal(true);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.getConnect(token).then((res) => {
        if (res) {
          const userData = {
            email: setUserEmail(res.data.email),
          };
          handleLogin(userData);
          navigate("/mesto-react");
        }
      });
    }
  }, []);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getInfoProfile(currentUser)])
      .then(([cardsData, userData]) => {
        setCards([...cards, ...cardsData]);
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id,
        });
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  }, []);

  const closeAllPopups = () => {
    setEditProfile(false);
    setOnAddPlace(false);
    setOnEditAvatar(false);
    setOnDeleteCard(false);
    setSelectedCard(false);
    setIsSuccessModal(false);
  };

  const handleUpdateUser = (data) => {
    api
      .infoProfileEdit({ name: data.name, about: data.about })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };
  const handleUpdateAvatar = (data) => {
    api
      .setAvatar({ avatar: data.avatar })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .postedCard({ name: data.name, link: data.link })
      .then((data) => setCards([data, ...cards]))
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);

    api
      .toggleLike(card.id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };

  const handleCardDelete = (cardID) => {
    console.log(cardID);
    api
      .deleteCard(cardID)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardID));
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };

  return (
    <div>
      <Header currentUser={userEmail} loggedIn={loggedIn} />
      <CurrentUserContext.Provider value={currentUser}>
        <CardContext.Provider value={cards}>
          <Routes>
            <Route
              path="/mesto-react"
              element={
                <ProtectRoute loggedIn={loggedIn}>
                  <Main
                    setEditProfile={handleEditProfileClick}
                    setOnAddPlace={handleAddPlaceClick}
                    setOnEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onDeleteClick={handleDeleteClick}
                  />
                </ProtectRoute>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  handleSignIn={handleSignIn}
                  errorModal={isErrorModal}
                  onClose={closeModalAuth}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  handleSignUp={handleSignUp}
                  successModal={isSuccessModal}
                  errorModal={isErrorModal}
                  setModal={setIsSuccessModal}
                  onClose={closeModalAuth}
                />
              }
            />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/mesto-react" />
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfile}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatar}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlace}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />

          <DeleteCardPopup
            isOpen={isDeleteCard}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isDeleteCard={isDeleteCard}
          />
        </CardContext.Provider>

        <Footer />

        <ImagePopup
          selectedCard={selectedCard}
          isOpened={selectedCard}
          isClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
