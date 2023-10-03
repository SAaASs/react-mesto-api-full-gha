import { PopupWithForm } from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export function EditPopup({ onClose, submitHandler, isOpen }) {
  const [workValue, setWorkValue] = React.useState("");
  const [nameValue, setNameValue] = React.useState("");
  const user = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setNameValue(user?.name);
    setWorkValue(user?.about);
  }, [isOpen]);
  function handleNameChange(e) {
    setNameValue(e.target.value);
  }
  function handleWorkChange(e) {
    setWorkValue(e.target.value);
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      buttonText={"Сохранить"}
      submitHandler={(e) => {
        e.preventDefault();
        submitHandler(nameValue, workValue);
      }}
      onClose={onClose}
      popupTitle={"Редактировать профиль"}
      formName={"Edit"}
    >
      <fieldset id="editFields" className="popup__fields">
        <div className="popup__input-container">
          <input
            value={nameValue}
            onChange={handleNameChange}
            name="name_input"
            placeholder="Имя"
            className="popup__input"
            id="popupName"
            noValidate
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popupName-error popup__error"></span>
        </div>
        <div className="popup__input-container">
          <input
            value={workValue}
            onChange={handleWorkChange}
            name="work_input"
            placeholder="О себе"
            className="popup__input"
            id="popupWork"
            noValidate
            minLength="2"
            maxLength="400"
            required
          />
          <span className="popupWork-error popup__error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
