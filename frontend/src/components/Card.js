import React, { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export function Card({ card, clickHandler, likeHandler, onDeletePopupOpen }) {
  const user = React.useContext(CurrentUserContext);
  let isLiked;
  for (let i = 0; i <= card.likes.length; i++) {
    console.log(card.likes[i]);
    if (card.likes[i] == user._id) {
      isLiked = true;
      break;
    }
  }
  const cardLikeButtonClassName = `element__bottom-like ${
    isLiked && 'element__bottom-like_liked'
  }`;
  const isBelongToCurrentUser = user._id == card.owner;

  return (
    <div className="element">
      {isBelongToCurrentUser && (
        <button
          onClick={onDeletePopupOpen}
          data-id=""
          type="button"
          className="element__delete"
        ></button>
      )}
      <img
        alt={card.name}
        onClick={clickHandler}
        className="element__image"
        src={card.link}
      />
      <div className="element__bottom">
        <h2 className="element__bottom-text">{card.name}</h2>
        <div className="element__bottom-like-container">
          <button
            type="button"
            data-id="full-image-popup"
            onClick={likeHandler}
            className={cardLikeButtonClassName}
          ></button>
          <div className="element__bottom-like-counter">
            {card.likes.length}
          </div>
        </div>
      </div>
    </div>
  );
}
