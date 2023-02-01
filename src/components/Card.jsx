import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({
  name,
  link,
  likes,
  owner,
  id,
  onCardClick,
  onCardLike,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = likes.some((i) => i._id === currentUser.id);
  const likeButton = `element__button-like ${
    isLiked && "element__button-like_active"
  }`;
  const isOwn = owner._id === currentUser.id;

  const handleClick = () => {
    onCardClick({ link, name });
    console.log({ link, name });
  };
  const handleDeleteCard = () => {
    onDeleteClick(id);
  };

  return (
    <article className="element">
      {isOwn && (
        <button
          aria-label="Delete"
          type="button"
          className="element__btn-delete"
          onClick={handleDeleteCard}
        ></button>
      )}
      <img
        src={link}
        onClick={handleClick}
        className="element__image"
        alt={name}
      />
      <div className="element__position">
        <h2 className="element__title">{name}</h2>
        <div className="element__section">
          <button
            className={likeButton}
            type="button"
            onClick={() => onCardLike({ likes, id })}
          ></button>
          <p className="element__like-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
