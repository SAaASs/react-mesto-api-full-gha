import { useNavigate } from "react-router-dom";
export function Header({
  isLoggining,
  setIsLoggining,
  setIsLoggedIn,
  currentEmail,
  isLoggedIn,
  setCurrentEmail,
}) {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__right">
        <div className="header__email">{currentEmail}</div>
        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("mestoReactToken");
              setIsLoggedIn(false);
              setCurrentEmail("");
            }}
            className="header__button"
          >
            Выйти
          </button>
        ) : isLoggining ? (
          <button
            onClick={() => {
              navigate("/sign-in");
              setIsLoggining(false);
            }}
            className="header__button"
          >
            Войти
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/sign-up");
              setIsLoggining(true);
            }}
            className="header__button"
          >
            Регистрация
          </button>
        )}
      </div>
    </header>
  );
}
