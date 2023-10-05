import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { AddPopup } from './AddPopup';
import React, { useEffect } from 'react';
import { ImagePopup } from './ImagePopup';
import { api } from '../utils/API';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AvatarPopup } from './AvatarPopup';
import { EditPopup } from './EditPopup';
export function Home({ currentUser, setCurrentUser }) {
  const [editPopupOpened, setEditPopupOpened] = React.useState(false);
  const [doomedCard, setDoomedCard] = React.useState('');
  const [addPopupOpened, setaddPopupOpened] = React.useState(false);
  const [avatarPopupOpened, setavatarPopupOpened] = React.useState(false);
  const [cards, setCards] = React.useState([
    { name: 'name', link: 'link', likes: [], _id: 0 },
  ]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  React.useEffect(() => {
    api
      .getUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove('no-transition');
    }, 1000);
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    let isLiked;
    for (let i = 0; i <= card.likes.length; i++) {
      console.log(card.likes[i]);
      if (card.likes[i] == currentUser._id) {
        isLiked = true;
        break;
      }
    }
    api
      .updateLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    return api.deleteCard(card._id);
  }
  function updateAvatar(link) {
    return api.updateAvatar(link);
  }
  function updateProfile(personName, personWork) {
    return api.updateProfile(personName, personWork);
  }

  function updateCards(newPlaceName, newPlaceImgLink) {
    return api.sendCard(newPlaceName, newPlaceImgLink).then((value) => {
      setCards([value, ...cards]);
    });
  }
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <EditPopup
          isOpen={editPopupOpened}
          submitHandler={(personName, personWork) => {
            updateProfile(personName, personWork)
              .then((value) => {
                setCurrentUser(value);
                setEditPopupOpened(!editPopupOpened);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          onClose={() => {
            setEditPopupOpened(!editPopupOpened);
          }}
        ></EditPopup>
        <AddPopup
          isOpen={addPopupOpened}
          onClose={() => {
            setaddPopupOpened(!addPopupOpened);
          }}
          submitHandler={(newPlaceName, newPlaceImgLink) => {
            updateCards(newPlaceName, newPlaceImgLink)
              .then(() => {
                setaddPopupOpened(!addPopupOpened);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        ></AddPopup>
        <AvatarPopup
          isOpen={avatarPopupOpened}
          submitHandler={(link) => {
            updateAvatar(link)
              .then((value) => {
                setCurrentUser(value);
                setavatarPopupOpened(!avatarPopupOpened);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          onClose={() => {
            setavatarPopupOpened(!avatarPopupOpened);
          }}
        ></AvatarPopup>
        <PopupWithForm
          isOpen={doomedCard != ''}
          submitHandler={(e) => {
            e.preventDefault();
            handleCardDelete(doomedCard)
              .then(() => {
                setCards(cards.filter((card) => card != doomedCard));
                setDoomedCard('');
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          onClose={() => {
            setDoomedCard('');
          }}
          buttonText={'Да'}
          popupTitle={'Вы уверены?'}
          formName={'Delete'}
        ></PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={() => {
            setSelectedCard(null);
          }}
        ></ImagePopup>

        <Main
          dataForCards={{
            setDoomedCard: setDoomedCard,
            handleCardLike: handleCardLike,
            setSelectedCard: setSelectedCard,
          }}
          cards={cards}
          onAddPopupOpen={() => {
            setaddPopupOpened(!addPopupOpened);
          }}
          onEditPopupOpen={() => {
            setEditPopupOpened(!editPopupOpened);
          }}
          onAvatarPopupOpen={() => {
            setavatarPopupOpened(!avatarPopupOpened);
          }}
        ></Main>
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}
