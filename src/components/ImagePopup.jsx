function ImagePopup({ selectedCard, isOpened, isClose }) {

  return (
    <section className={`popup ${isOpened ? "popup_opened" : ""}`}>
      <div className="popup__body popup__body_dark">
        <div className="popup__content-photo">
          <button
            aria-label="Close"
            type="button"
            className="popup__close-button"
            onClick={isClose}
          ></button>
          <figure className="popup__figure-content">
            <img src={selectedCard.link} alt={selectedCard.name} className="popup__image" />
            <figcaption className="popup__caption">{selectedCard.name}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default ImagePopup;
