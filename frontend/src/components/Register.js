import { authApi } from "../utils/AuthAPI";
import { AuthPopup } from "./AuthPopup";
import React from "react";
import { useNavigate } from "react-router-dom";
export function Register({ currentUser, setCurrentUser }) {
  const [passwordValue, setPasswordValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [ansType, setAnsType] = React.useState(false);
  const [isAuthPopupOpened, setIsAuthPopupOpened] = React.useState(false);
  React.useEffect(() => {
    setEmailValue("");
    setPasswordValue("");
  }, []);
  const navigate = useNavigate();
  function handleEmailChange(e) {
    setEmailValue(e.target.value);
  }
  function handlePasswordChange(e) {
    setPasswordValue(e.target.value);
  }
  return (
    <>
      <AuthPopup
        onClose={() => {
          setIsAuthPopupOpened(false);
        }}
        ansType={ansType}
        isOpen={isAuthPopupOpened}
      ></AuthPopup>
      <div className="register">
        <h2 className="register__title">Регистрация</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authApi
              .RegMe(emailValue, passwordValue)
              .then((value) => {
                setAnsType(true);
                setIsAuthPopupOpened(true);
                currentUser._id = value.data._id;
                setCurrentUser(currentUser);
                setTimeout(() => {
                  navigate("/sign-in");
                }, "1000");

                console.log(value);
              })
              .catch((err) => {
                setAnsType(false);
                setIsAuthPopupOpened(true);
                console.log(err);
              });
          }}
          name={`registerForm`}
          className="register__form"
        >
          <fieldset
            style={{ border: "none" }}
            id="registerFields"
            className="register__fields"
          >
            <div className="register__input-container">
              <input
                placeholder="E-mail"
                className="register__input"
                noValidate
                minLength="2"
                maxLength="40"
                type="email"
                required
                value={emailValue}
                onChange={handleEmailChange}
              />
            </div>
            <div className="register__input-container">
              <input
                placeholder="Пароль"
                className="register__input"
                noValidate
                minLength="2"
                maxLength="40"
                type="password"
                required
                value={passwordValue}
                onChange={handlePasswordChange}
              />
              <span className="newPlaceImgLink-error popup__error"></span>
            </div>
          </fieldset>
          <button type="submit" className="register__save" id="registerSave">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__question">
          Уже зарегистрированы?
          <button
            className="header__button"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Войти
          </button>
        </div>
      </div>
    </>
  );
}
