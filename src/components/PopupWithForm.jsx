function PopupWithForm({ title, isOpened, onClose, onSubmit, btnText, name, children }) {
  return (
    <div className={`popup ${isOpened ? "popup_opened" : ""}`}>
      <div className="popup__body">
        <div className={name ? `popup__content${name}` : "popup__content" }>
          <button
            className="popup__close-button"
            onClick={onClose}
            aria-label="Close"
            type="button"
          ></button>
          <h3 className="popup__title">{title}</h3>
          <form className="popup__form" name="form" onSubmit={onSubmit}>
            {children}
            <button type="submit" className="popup__save-button">
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
