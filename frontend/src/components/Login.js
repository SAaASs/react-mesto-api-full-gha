import { authApi } from '../utils/AuthAPI';
import { api } from '../utils/API';
import { AuthPopup } from './AuthPopup';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export function Login({ setCurrentEmail, setIsLoggedIn }) {
  const [passwordValue, setPasswordValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [ansType, setAnsType] = React.useState(false);
  const navigate = useNavigate();
  const [isAuthPopupOpened, setIsAuthPopupOpened] = React.useState(false);
  React.useEffect(() => {
    setEmailValue('');
    setPasswordValue('');
  }, []);

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
        <h2 className="register__title">Авторизация</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authApi
              .getToken(emailValue, passwordValue)
              .then((value) => {
                console.log('getTokenThen', value);
                api._headers = {
                  'Content-Type': 'application/json',
                  authorisation: `Bearer ${value.token}`,
                };
                localStorage.setItem('mestoReactToken', value.token);
                return authApi.authMe(value.token);
              })
              .then((value) => {
                setCurrentEmail(value.email);
                navigate('/');
                setIsLoggedIn(true);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          name={`registerForm`}
          className="register__form"
        >
          <fieldset
            style={{ border: 'none' }}
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
                type="password"
                minLength="2"
                maxLength="40"
                required
                value={passwordValue}
                onChange={handlePasswordChange}
              />
              <span className="newPlaceImgLink-error popup__error"></span>
            </div>
          </fieldset>
          <button type="submit" className="register__save" id="registerSave">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}
