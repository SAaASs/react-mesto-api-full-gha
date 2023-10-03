import { PopupWithForm } from "./PopupWithForm";
import React from "react";
export function AvatarPopup({ onClose, submitHandler, isOpen }) {
  const avatarRef = React.useRef();
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      submitHandler={(e) => {
        e.preventDefault();
        submitHandler(avatarRef.current.value);
      }}
      buttonText={"Сохранить"}
      popupTitle={"Обновить аватар"}
      formName={"Avatar"}
    >
      <fieldset id="avatarFields" className="popup__fields">
        <div className="popup__input-container">
          <input
            ref={avatarRef}
            name="newPlaceAvatarLink"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_add"
            id="newPlaceAvatarLink"
            noValidate
            type="url"
            required
          />
          <span className="newPlaceAvatarLink-error popup__error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
