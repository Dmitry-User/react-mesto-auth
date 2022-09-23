import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/Api";
import * as auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import InfoBar from "./InfoBar";
import LoadingPage from "./LoadingPage";

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [loggedIn, setLoggetIn] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [typeInput, setTypeInput] = useState("password");
  const [passIcon, setPassIcon] = useState("pass-icon_type_unvisible");
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setIsLoadingPage(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingPage(false));
  }, []);

  useEffect(() => {
    const tokenCheck = () => {
      if (!localStorage.getItem("token")) return;
      const token = localStorage.getItem("token");
      auth
        .getContent(token)
        .then((res) => {
          setEmailUser(res.data.email);
          setLoggetIn(true);
          history.push("/");
        })
        .catch((err) => console.log(err));
    };

    tokenCheck();
  }, []);

  const handleUpdateUser = (user) => {
    setIsLoading(true);
    api
      .setUserInfo(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (user) => {
    setIsLoading(true);
    api
      .setAvatar(user)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlaceSubmit = (cardData) => {
    setIsLoading(true);
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = () => {
    const currentCard = cardId;
    setIsLoading(true);
    api
      .deleteCard(currentCard)
      .then(() => {
        setCards((newCards) => newCards.filter((c) => c._id !== currentCard));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteCardClick = (cardId) => {
    setConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
    setCardId(cardId);
  };

  const handleEditAvatarClick = () =>
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

  const handleEditProfileClick = () =>
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);

  const handleAddPlaceClick = () =>
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPlacePopupOpen(!isPlacePopupOpen);
  };

  const handleRegister = (password, email) => {
    return auth.register(password, email).then(() => {
      history.push("/sign-in");
    });
  };

  const handleLogin = (password, email) => {
    return auth.authorize(password, email).then((data) => {
      localStorage.setItem("token", data.token);
      setEmailUser(email);
      setLoggetIn(true);
      history.push("/");
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setEmailUser("");
    setLoggetIn(false);
    setIsVisible(false);
    setTypeInput("password");
    setPassIcon("pass-icon_type_unvisible");
    history.push("/sign-in");
  };

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleInfoTooltip = (status) => {
    setIsSuccess(status);
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setCardId("");
  };

  const handleInitInput = () => {
    setTypeInput("password");
    setPassIcon("pass-icon_type_unvisible");
  };

  const togglePassIcon = () => {
    if (typeInput === "password") {
      setTypeInput("text");
      setPassIcon("pass-icon_type_visible");
    } else {
      setTypeInput("password");
      setPassIcon("pass-icon_type_unvisible");
    }
  };

  return isLoadingPage ? (
    <LoadingPage />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <InfoBar
          isVisible={isVisible}
          emailUser={emailUser}
          onLogout={handleLogout}
        />
        <Header
          emailUser={emailUser}
          onLogout={handleLogout}
          onVisible={handleVisible}
          onInitInput={handleInitInput}
        />
        <main className="content">
          <Switch>
            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
                onInfoTooltip={handleInfoTooltip}
                typeInput={typeInput}
                passIcon={passIcon}
                onToggleIcon={togglePassIcon}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
                onInfoTooltip={handleInfoTooltip}
                typeInput={typeInput}
                passIcon={passIcon}
                onToggleIcon={togglePassIcon}
                onInitInput={handleInitInput}
              />
            </Route>
            <ProtectedRoute path="/" loggedIn={loggedIn}>
              <Main
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                onCardClick={handleCardClick}
                onAddCard={handleAddPlaceClick}
              />
            </ProtectedRoute>
          </Switch>
        </main>
        <Footer />
      </div>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
        buttonText={isLoading ? "Сохранение..." : "Обновить"}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
        buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
        buttonText={isLoading ? "Сохранение..." : "Создать"}
      />
      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        isLoading={isLoading}
        buttonText={isLoading ? "Удаление..." : "Удалить"}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
