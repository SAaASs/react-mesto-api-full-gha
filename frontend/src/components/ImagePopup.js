export function ImagePopup({ card, onClose }) {
  if (card != null) {
    return (
      <div
        id="full-image-popup"
        className={`full-image-popup popup full-image-popup_darker popup_opened`}
      >
        <div className="full-image-popup__img-container">
          <img
            id="full-image-popup__img"
            className="full-image-popup__img"
            alt={card.name}
            src={card.link}
          />
          <button
            onClick={onClose}
            type="button"
            className="popup__close-button"
          ></button>
          <p className="full-image-popup__img-name">{card.name}</p>
        </div>
      </div>
    );
  }
}
