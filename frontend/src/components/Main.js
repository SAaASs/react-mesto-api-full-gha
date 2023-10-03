import React, { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Card } from "./Card";
export function Main({
  onAddPopupOpen,
  onEditPopupOpen,
  onAvatarPopupOpen,
  cards,
  dataForCards,
}) {
  const user = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div
            onClick={onAvatarPopupOpen}
            className="profile__avatar-container"
          >
            <button className="profile__avatar-shadow"></button>
            <img
              alt="Жак-Ив Кусто"
              src={user?.avatar}
              className="profile__avatar"
            />
          </div>
          <div className="profile__wrap-vert">
            <div className="profile__wrap-hori">
              <h1 className="profile__name" id="profile__name">
                {user?.name}
              </h1>
              <button
                onClick={onEditPopupOpen}
                type="button"
                data-id="popupEdit"
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__work" id="profile__work">
              {user?.about}
            </p>
          </div>
        </div>
        <button
          onClick={onAddPopupOpen}
          type="button"
          data-id="popupAdd"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((item) => {
          return (
            <Card
              onDeletePopupOpen={() => {
                dataForCards.setDoomedCard(item);
              }}
              card={item}
              key={item._id}
              likeHandler={() => {
                dataForCards.handleCardLike(item);
              }}
              clickHandler={() => {
                dataForCards.setSelectedCard(item);
              }}
            />
          );
        })}
      </section>
    </main>
  );
}
