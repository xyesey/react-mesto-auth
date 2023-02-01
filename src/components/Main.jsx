import { useContext } from "react";
import { CardContext } from "../contexts/CardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  setEditProfile,
  setOnAddPlace,
  setOnEditAvatar,
  onCardClick,
  onCardLike,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            onClick={() => setOnEditAvatar(true)}
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <button
              onClick={() => setEditProfile(true)}
              className="profile__edit-button"
              aria-label="Редактировать"
              type="button"
            ></button>
          </div>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={() => setOnAddPlace(true)}
          className="profile__add-button"
          aria-label="Добавить карточку"
          type="button"
        ></button>
      </section>

      <section className="elements">
        {cards.map(({ _id, ...card }) => {
          return (
            <Card
              key={`cardID ${_id}`}
              {...card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeleteClick={onDeleteClick}
              id={_id}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
