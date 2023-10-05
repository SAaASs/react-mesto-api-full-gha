const userRouter = require('express').Router(); // создали роутер
const {
  patchProfileValidator,
  patchAvatarValidator,
  getUserValidator,
} = require('../middlewares/errHandler');
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
userRouter.get('/', cors(corsOptions), getAllUsers);
userRouter.get('/me', cors(corsOptions), getCurrentUser);
userRouter.get('/:userId', cors(corsOptions), getUserValidator, getUserById);

userRouter.patch(
  '/me',
  cors(corsOptions),
  patchProfileValidator,
  patchUserInfo,
);
userRouter.patch(
  '/me/avatar',
  cors(corsOptions),
  patchAvatarValidator,
  patchUserAvatar,
);
module.exports = { userRouter };
