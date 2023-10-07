const cardsRouter = require('express').Router(); // создали роутер
const {
  createCardValidator,
  changeCardStateValidator,
} = require('../middlewares/errHandler');
const {
  likeCard,
  unlikeCard,
  getAllCards,
  deleteCardById,
  createCard,
} = require('../controllers/cards');
const cors = require('cors');

const corsOptions = {
  origin: 'https://sasdom.students.nomoredomainsrocks.ru',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
cardsRouter.get('/', cors(corsOptions), getAllCards);
cardsRouter.delete(
  '/:cardId',
  cors(corsOptions),
  changeCardStateValidator,
  deleteCardById,
);
cardsRouter.post('/', cors(corsOptions), createCardValidator, createCard);
cardsRouter.put(
  '/:cardId/likes',
  cors(corsOptions),
  changeCardStateValidator,
  likeCard,
);
cardsRouter.delete(
  '/:cardId/likes',
  cors(corsOptions),
  changeCardStateValidator,
  unlikeCard,
);

module.exports = { cardsRouter };
