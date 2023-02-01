import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const {
    register,
    formState,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    reset({
      url: "",
    });
  }, [isOpen]);

  const onSubmit = (data) => {
    onUpdateAvatar({
      avatar: data.url,
    });
    onClose();
  };

  return (
    <PopupWithForm
      title="Обновить Аватар"
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      btnText="Обновить"
      name="-avatar"
    >
      <input
        type="url"
        className={`popup__input`}
        placeholder="Ссылка на картинку"
        {...register("url", {
          required: "Поле обязательно к заполнению.",
          minLength: {
            value: 5,
            message: "Минимум 5 символoв.",
          },
        })}
      ></input>
      <span className="popup__error_visible">{errors?.url?.message}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
