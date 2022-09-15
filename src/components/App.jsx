import { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Plases from "./Plases";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
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

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
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
  }

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
  }

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
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
      })
      .catch((err) => console.log(err));
  }

  const handleCardDelete = () => {
    const currentCard = cardId;
    setIsLoading(true);
    api
      .deleteCard(currentCard)
      .then(() => {
        setCards((newCards) => newCards.filter((c) => (c._id !== currentCard)));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleDeleteCardClick = (cardId) => {
    setConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
    setCardId(cardId);
  }

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(!isEditProfilePopupOpen);

  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(!isAddPlacePopupOpen);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPlacePopupOpen(!isPlacePopupOpen);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setIsPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setCardId("");
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Header
          loggedIn={loggedIn}
        />
        <main className="content">
          <Switch>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
              onCardClick={handleCardClick}
              onAddCard={handleAddPlaceClick}
              component={Plases}
            />
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
        buttonText={ isLoading ? "Сохранение..." : "Сохранить"}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
        buttonText={ isLoading ? "Сохранение..." : "Сохранить"}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
        buttonText={ isLoading ? "Создание..." : "Создать"}
      />
      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        isLoading={isLoading}
        buttonText={ isLoading ? "Удаление..." : "Удалить"}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isPlacePopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
