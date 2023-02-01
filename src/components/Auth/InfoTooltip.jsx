import success from "../../image/success.svg";
import error from "../../image/error.svg";

function InfoTooltip({ successModal, errorModal, onClose }) {
  return (
    <div
      className={`popup ${
        successModal ? "popup_opened" : errorModal ? "popup_opened" : ""
      }`}
    >
      <div className="popup__body">
        <div className="popup__content">
          <button
            className="popup__close-button"
            onClick={onClose}
            aria-label="Close"
            type="button"
          ></button>
          <div className="popup__auth">
            <img
              className="popup__auth-image"
              src={successModal ? success : error}
            />
            <h3 className="popup__auth-title">
              {successModal
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попрубуйте еще раз."}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
