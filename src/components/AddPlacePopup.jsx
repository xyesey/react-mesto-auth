import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const {
    register,
    formState: { errors, },
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      placeName: "",
      url: ""
    })
  }, [isOpen])

  const onSubmit = (data) => {
    console.log(data);

    onAddCard({
      name: data.placeName,
      link: data.url,
    });

    onClose();
  };

  return (
    <PopupWithForm
      title="Новое место"
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      btnText="Добавить"
    >
      <input
        type="text"
        className={`popup__input`}
        placeholder="Название"
        {...register("placeName", {
          required: "Поле обязательно к заполнению.",
          minLength: {
            value: 3,
            message: "Минимум 3 символа.",
          },
        })}
      ></input>
      <span className="popup__error_visible">{errors?.placeName?.message}</span>
      <input
        type="url"
        className={`popup__input`}
        placeholder="Ссылка на картинку"
        {...register("url", {
          required: "Поле обязательно к заполнению.",
          minLength: {
            value: 7,
            message: "Минимум 7 символов.",
          },
        })}
      ></input>
      <span className="popup__error_visible">{errors?.url?.message}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
