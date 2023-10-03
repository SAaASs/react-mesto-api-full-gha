import { PopupWithForm } from "./PopupWithForm";
import React from "react";
export function AddPopup({ onClose, submitHandler, isOpen }) {
  const [newPlaceNameValue, setNewPlaceNameValue] = React.useState("");
  const [newPlaceImgLinkValue, setNewPlaceImgLinkValue] = React.useState("");
  React.useEffect(() => {
    setNewPlaceImgLinkValue("");
    setNewPlaceNameValue("");
  }, [isOpen]);
  function handleNameChange(e) {
    setNewPlaceNameValue(e.target.value);
  }
  function handleLinkChange(e) {
    setNewPlaceImgLinkValue(e.target.value);
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      submitHandler={(e) => {
        e.preventDefault();
        submitHandler(newPlaceNameValue, newPlaceImgLinkValue);
      }}
      buttonText={"Сохранить"}
      popupTitle={"Новое место"}
      formName={"Add"}
    >
      <fieldset id="addFields" className="popup__fields">
        <div className="popup__input-container">
          <input
            value={newPlaceNameValue}
            onChange={handleNameChange}
            name="newPlaceName"
            placeholder="Название"
            className="popup__input popup__input_add"
            id="newPlaceName"
            noValidate
            minLength="2"
            maxLength="40"
            required
          />
          <span className="newPlaceName-error popup__error"></span>
        </div>
        <div className="popup__input-container">
          <input
            value={newPlaceImgLinkValue}
            onChange={handleLinkChange}
            name="newPlaceImgLink"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_add"
            id="newPlaceImgLink"
            noValidate
            type="url"
            required
          />
          <span className="newPlaceImgLink-error popup__error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
