import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, isDeleteCard }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    onDeleteCard(isDeleteCard);
    onClose();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText="Да"
      name="-delete"
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
